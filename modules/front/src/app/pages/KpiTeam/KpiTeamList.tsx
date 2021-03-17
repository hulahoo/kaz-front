import * as React from "react";
import {inject, observer} from "mobx-react";

import {action, observable} from "mobx";

import {Col, Modal, Row, Select, Table} from "antd";

import {
  collection,
  injectMainStore,
  MainStoreInjected,
  DataTable, Msg, getEnumCaption, getPropertyInfoNN, getMainStore
} from "@cuba-platform/react";

import {AssignedPerformancePlan} from "../../../cuba/entities/base/tsadv$AssignedPerformancePlan";
import {SerializedEntity} from "@cuba-platform/rest";

import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import {RootStoreProp} from "../../store";
import {restQueries} from "../../../cuba/queries";
import Column from "antd/es/table/Column";
import {Link} from "react-router-dom";
import {AssignedPerformancePlanManagement} from "../Kpi/AssignedPerformancePlanManagement";
import {PerformancePlan} from "../../../cuba/entities/base/tsadv$PerformancePlan";
import moment from "moment";
import {AssignmentExt} from "../../../cuba/entities/base/base$AssignmentExt";
import {PersonGroupExt} from "../../../cuba/entities/base/base$PersonGroupExt";
import {Organization} from "../../../cuba/entities/base/base$Organization";
import {PositionGroup} from "../../../cuba/entities/base/base$PositionGroup";

@injectMainStore
@inject("rootStore")
@observer
class KpiTeamListComponent extends React.Component<MainStoreInjected & WrappedComponentProps & RootStoreProp> {

  @observable
  loading: boolean = false;

  @observable
  dataCollection: SerializedEntity<AssignedPerformancePlan>[];

  @observable
  performancePlans: SerializedEntity<PerformancePlan>[];

  @action
  setDataCollection = (value: SerializedEntity<AssignedPerformancePlan>[]) => {
    this.dataCollection = value;
  };

  onChangePerformancePlan = (value: string, option: React.ReactElement<HTMLLIElement>) => {
    if (!value) {
      this.loadDataCollection();
    } else {
      this.loading = true;
      restQueries.kpiTeam(this.props.rootStore!.userInfo.personGroupId!, value).then(response => {
        this.setDataCollection(response);
        this.loading = false;
      });
    }
  };

  render() {
    const {Option} = Select;

    return (
      <Page>
        <Section size={"large"}>
          <Row style={{"margin": '10px 0'}}>
            <Col span={8}>
              <Select onChange={this.onChangePerformancePlan} style={{width: '100%'}} allowClear
                      placeholder={this.props.intl.formatMessage({id: "kpiTeam.list.filter.performancePlan"})}>
                {this.performancePlans ? this.performancePlans.map(pp => {
                  return <Option value={pp.id} key={pp.id}>{pp._instanceName}</Option>
                }) : <Option key={"empty"}/>}
              </Select>
            </Col>
          </Row>
          <Table dataSource={this.dataCollection} pagination={false}
                 size="default" bordered={false} rowKey="id" loading={this.loading}>
            <Column title={<Msg entityName={AssignedPerformancePlan.NAME} propertyName={"performancePlan"}/>}
                    dataIndex={"performancePlan"}
                    key={"performancePlan"} render={(text, record: SerializedEntity<AssignedPerformancePlan>) => {
              return <Link
                to={AssignedPerformancePlanManagement.PATH + "/" + record.id}
                key="edit">
                {(record.performancePlan! as SerializedEntity<PerformancePlan>)._instanceName}
              </Link>
            }}/>
            <Column title={<Msg entityName={AssignedPerformancePlan.NAME} propertyName={"assignedPerson"}/>}
                    dataIndex={"assignedPerson"}
                    key={"assignedPerson"} render={(text, record: SerializedEntity<AssignedPerformancePlan>) => {
              return <span>
                {(record.assignedPerson! as SerializedEntity<PersonGroupExt>)._instanceName}
                </span>
            }}/>
            <Column title={<FormattedMessage id="department"/>}
                    dataIndex={"organizationGroup"}
                    key={"organizationGroup"} render={(text, record: SerializedEntity<AssignedPerformancePlan>) => {
              return <span>
                {(record.assignedPerson!.assignments![0].organizationGroup!.organization! as SerializedEntity<Organization>)._instanceName}
                </span>
            }}/>
            <Column title={<FormattedMessage id="position"/>}
                    dataIndex={"jobGroup"}
                    key={"jobGroup"} render={(text, record: SerializedEntity<AssignedPerformancePlan>) => {
              return <span>
                {(record.assignedPerson!.assignments![0].jobGroup! as SerializedEntity<PositionGroup>)._instanceName}
                </span>
            }}/>
            <Column title={<Msg entityName={AssignedPerformancePlan.NAME} propertyName={"status"}/>}
                    dataIndex={"status"}
                    key={"status"} render={(text, record: SerializedEntity<AssignedPerformancePlan>) => {
              return <span>
                {getEnumCaption(record.stepStageStatus, getPropertyInfoNN("stepStageStatus", AssignedPerformancePlan.NAME, this.props.mainStore!.metadata!), this.props.mainStore!.enums!)}
                </span>
            }}/>
            <Column title={this.props.intl.formatMessage({id: "period"})}
                    dataIndex={"endDate"}
                    key={"endDate"} render={(text, record, index) => {
              return (React.createElement("div", null, moment(text).format("YYYY")));
            }}/>
          </Table>
        </Section>
      </Page>
    );
  }


  componentDidMount(): void {
    this.loadDataCollection().then(response => {
      restQueries.kpiTeamPerformancePlans(this.props.rootStore!.userInfo.personGroupId!).then(response => {
        this.performancePlans = response.filter(((value, index, array) => {
          for (let i = 0; i < index; i++) {
            if (array[i].id === value.id) {
              return false;
            }
          }
          return true;
        }));
      }).catch(() => {
      });
    })
  }

  loadDataCollection = () => {
    this.loading = true;
    return restQueries.kpiTeamList(this.props.rootStore!.userInfo.personGroupId!).then(response => {
      this.setDataCollection(response);
      this.loading = false;
      return response;
    }).catch(() => {
      this.loading = false;
    });
  }
}

export default injectIntl(KpiTeamListComponent);
