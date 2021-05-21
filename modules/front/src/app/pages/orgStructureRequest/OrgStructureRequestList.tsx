import * as React from "react";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";

import {observable} from "mobx";

import {Button, Col, Icon, Modal, Row, Spin, Table} from "antd";

import {collection, injectMainStore, MainStoreInjected, Msg} from "@cuba-platform/react";
import {OrgStructureRequest} from "../../../cuba/entities/base/tsadv_OrgStructureRequest";
import {SerializedEntity} from "@cuba-platform/rest";
import {OrgStructureRequestManagement} from "./OrgStructureRequestManagement";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import Column from "antd/es/table/Column";
import {PersonGroupExt} from "../../../cuba/entities/base/base$PersonGroupExt";
import {OrganizationGroupExt} from "../../../cuba/entities/base/base$OrganizationGroupExt";
import {DicCompany} from "../../../cuba/entities/base/base_DicCompany";
import {DicRequestStatus} from "../../../cuba/entities/base/tsadv$DicRequestStatus";
import {RootStoreProp} from "../../store";
import {restServices} from "../../../cuba/services";

@injectMainStore
@inject("rootStore")
@observer
class OrgStructureRequestListComponent extends React.Component<MainStoreInjected & WrappedComponentProps & RootStoreProp> {

  @observable selectedRowKey: string | undefined;

  @observable hasPermitToCreate: boolean = false;

  dataCollection = collection<OrgStructureRequest>(
    OrgStructureRequest.NAME, {
      view: "orgStructureRequest-edit",
      sort: "requestNumber",
      filter: {
        conditions: [{
          property: "author.id",
          operator: "=",
          value: this.props.rootStore!.userInfo.personGroupId!
        }]
      }
    }
  );

  fields = ["requestNumber", "requestDate", "company", "department", "author"];

  render() {
    const buttons = [
      this.hasPermitToCreate
        ? <Link
          to={OrgStructureRequestManagement.PATH + "/" + OrgStructureRequestManagement.NEW_SUBPATH}
          key="create">
          <Button
            htmlType="button"
            style={{margin: "0 12px 12px 0"}}
            type="primary">
            <Icon type="plus"/>
            <FormattedMessage id="management.browser.create"/>
          </Button>
        </Link> : null
    ];

    return (
      <Page>
        <Section size={"large"}>
          <Spin spinning={this.dataCollection.status === 'LOADING'}>
            <Row style={{"margin": '10px 0'}}>
              <Col span={24}>
                {buttons}
              </Col>
            </Row>
            <Table dataSource={Array.from(this.dataCollection.items || '')}
                   pagination={false}
                   size="default" bordered={false} rowKey="id"
                   onRow={(record) => {
                     return {
                       onClick: () => {
                         this.setState({
                           rowId: record.id,
                         });
                       }
                     };
                   }}>
              <Column title={<Msg entityName={OrgStructureRequest.NAME} propertyName={"requestNumber"}/>}
                      dataIndex={"requestNumber"}
                      key={"requestNumber"}
                      render={(text, record: OrgStructureRequest) => {
                        return <Link
                          to={OrgStructureRequestManagement.PATH + "/" + record.id}
                          key="edit">
                          {text}
                        </Link>
                      }}/>
              <Column title={<Msg entityName={OrgStructureRequest.NAME} propertyName={"requestDate"}/>}
                      dataIndex={"requestDate"}
                      key={"requestDate"}/>
              <Column title={<Msg entityName={OrgStructureRequest.NAME} propertyName={"status"}/>}
                      dataIndex={"status"}
                      key={"status"} render={(text, record: SerializedEntity<any>) => {
                return <span>{(record.status! as SerializedEntity<DicRequestStatus>)._instanceName}</span>
              }}/>
              <Column title={<Msg entityName={OrgStructureRequest.NAME} propertyName={"company"}/>}
                      dataIndex={"company"}
                      key={"company"} render={(text, record: SerializedEntity<OrgStructureRequest>) => {
                return <span>{(record.company! as SerializedEntity<DicCompany>)._instanceName}</span>
              }}/>
              <Column title={<Msg entityName={OrgStructureRequest.NAME} propertyName={"department"}/>}
                      dataIndex={"department"}
                      key={"department"} render={(text, record: SerializedEntity<OrgStructureRequest>) => {
                return <span>{(record.department! as SerializedEntity<OrganizationGroupExt>)._instanceName}</span>
              }}/>
              <Column title={<Msg entityName={OrgStructureRequest.NAME} propertyName={"author"}/>}
                      dataIndex={"author"}
                      key={"author"} render={(text, record: SerializedEntity<OrgStructureRequest>) => {
                return <span>{(record.author! as SerializedEntity<PersonGroupExt>)._instanceName}</span>
              }}/>
            </Table>
          </Spin>
        </Section>
      </Page>
    );
  }

  showDeletionDialog = (e: SerializedEntity<OrgStructureRequest>) => {
    Modal.confirm({
      title: this.props.intl.formatMessage(
        {id: "management.browser.delete.areYouSure"},
        {instanceName: e.requestNumber}
      ),
      okText: this.props.intl.formatMessage({
        id: "management.browser.delete.ok"
      }),
      cancelText: this.props.intl.formatMessage({
        id: "management.browser.delete.cancel"
      }),
      onOk: () => {
        this.selectedRowKey = undefined;

        return this.dataCollection.delete(e);
      }
    });
  };

  getRecordById(id: string): SerializedEntity<OrgStructureRequest> {
    const record:
      | SerializedEntity<OrgStructureRequest>
      | undefined = this.dataCollection.items.find(record => record.id === id);

    if (!record) {
      throw new Error("Cannot find entity with id " + id);
    }

    return record;
  }

  componentDidMount(): void {
    restServices.orgStructureService.hasPermitToCreate()
      .then((hasPermitToCreate: boolean) => {
        this.hasPermitToCreate = hasPermitToCreate;
      });
  }
}

const OrgStructureRequestList = injectIntl(OrgStructureRequestListComponent);

export default OrgStructureRequestList;
