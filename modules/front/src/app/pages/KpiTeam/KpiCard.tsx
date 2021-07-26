import * as React from "react";
import {inject, observer} from "mobx-react";

import {observable} from "mobx";

import {Table} from "antd";

import {
  collection,
  getEnumCaption,
  getPropertyInfoNN,
  injectMainStore,
  MainStoreInjected,
  Msg
} from "@cuba-platform/react";

import {AssignedPerformancePlan} from "../../../cuba/entities/base/tsadv$AssignedPerformancePlan";
import {SerializedEntity} from "@cuba-platform/rest";

import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import Column from "antd/es/table/Column";
import {Link} from "react-router-dom";
import {AssignedPerformancePlanManagement} from "../Kpi/AssignedPerformancePlanManagement";
import {PerformancePlan} from "../../../cuba/entities/base/tsadv$PerformancePlan";
import moment from "moment";
import {Organization} from "../../../cuba/entities/base/base$Organization";
import {PositionGroup} from "../../../cuba/entities/base/base$PositionGroup";

export type KpiCardProps = {
  personGroupId: string,
  performancePlan?: string,
};

@injectMainStore
@inject("rootStore")
@observer
class KpiCard extends React.Component<KpiCardProps & MainStoreInjected & WrappedComponentProps> {

  @observable
  dataCollection = collection<AssignedPerformancePlan>(
    AssignedPerformancePlan.NAME,
    {
      view: "assignedPerformancePlan-kpi-team", sort: "-updateTs", filter: {
        conditions:
          !this.props.performancePlan
            ? [{
              property: "assignedPerson",
              operator: "=",
              value: this.props.personGroupId
            }]
            : [{
              property: "assignedPerson",
              operator: "=",
              value: this.props.personGroupId
            },
              {
                property: "performancePlan",
                operator: "=",
                value: this.props.performancePlan
              }]
        ,
      }
    }
  )

  render() {

    return (
      <Table dataSource={this.dataCollection.items}
             size="default" bordered={false}
             rowKey="id">
        <Column title={this.props.intl.formatMessage({ id: "performancePlan" })}
                dataIndex={"performancePlan"}
                key={"performancePlan"} render={(text, record: SerializedEntity<AssignedPerformancePlan>) => {
          return <Link
            to={AssignedPerformancePlanManagement.PATH + "/" + record.id}
            key="edit">
            {(record.performancePlan! as SerializedEntity<PerformancePlan>)._instanceName}
          </Link>
        }}/>
        {/*<Column title={<Msg entityName={AssignedPerformancePlan.NAME} propertyName={"assignedPerson"}/>}
                    dataIndex={"assignedPerson"}
                    key={"assignedPerson"} render={(text, record: SerializedEntity<AssignedPerformancePlan>) => {
              return <span>
                {(record.assignedPerson! as SerializedEntity<PersonGroupExt>)._instanceName}
                </span>
            }}/>*/}
        <Column title={<FormattedMessage id="unit"/>}
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
                dataIndex={"stage._instanceName"}
                key={"status"}
        />
        <Column title={this.props.intl.formatMessage({id: "performanceAppraisalPeriod"})}
                dataIndex={"endDate"}
                key={"endDate"} render={(text) => {
          return (React.createElement("div", null, moment(text).format("YYYY")));
        }}/>
        <Column title={this.props.intl.formatMessage({id: "result"})}
                dataIndex={"result"}
                key={"result"}
                render={(text) => {
                  return (React.createElement("div", null, (text || 0) + "%"));
                }}/>
      </Table>
    );
  }
}

export default injectIntl(KpiCard);
