import * as React from "react";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";

import {observable} from "mobx";

import {Card, Checkbox, Modal, Table} from "antd";

import {
  collection,
  getEnumCaption,
  getPropertyInfoNN,
  injectMainStore, MainStore,
  MainStoreInjected,
  Msg
} from "@cuba-platform/react";

import {AssignedPerformancePlan} from "../../../cuba/entities/base/tsadv$AssignedPerformancePlan";
import {MetaPropertyInfo, SerializedEntity} from "@cuba-platform/rest";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {RootStoreProp} from "../../store";
import Section from "../../hoc/Section";
import Page from "../../hoc/PageContentHoc";
import Column from "antd/es/table/Column";
import {AssignedPerformancePlanManagement} from "./AssignedPerformancePlanManagement";
import {PerformancePlan} from "../../../cuba/entities/base/tsadv$PerformancePlan";
import moment from "moment";

@injectMainStore
@inject("rootStore")
@observer
class AssignedPerformancePlanListComponent extends React.Component<MainStoreInjected & WrappedComponentProps & RootStoreProp> {
  dataCollection = collection<AssignedPerformancePlan>(
    AssignedPerformancePlan.NAME,
    {
      view: "assignedPerformancePlan-myKpi", sort: "-updateTs", filter: {
        conditions: [{
          property: "assignedPerson",
          operator: "=",
          value: this.props.rootStore!.userInfo.personGroupId!
        }]
      }
    }
  );

  fields = [
    "status",

    "startDate",
  ];

  @observable selectedRowKey: string | undefined;

  showDeletionDialog = (e: SerializedEntity<AssignedPerformancePlan>) => {
    Modal.confirm({
      title: this.props.intl.formatMessage(
        {id: "management.browser.delete.areYouSure"},
        {instanceName: e._instanceName}
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

  render() {
    return (
      <Page>
        <Section visible={false} size={"large"}>
          <Table dataSource={this.dataCollection.items} pagination={false}
                 size="default" bordered={false} rowKey="id">
            <Column title={<Msg entityName={AssignedPerformancePlan.NAME} propertyName={"performancePlan"}/>}
                    dataIndex={"performancePlan"}
                    key={"performancePlan"} render={(text, record: SerializedEntity<AssignedPerformancePlan>) => {
              return <Link
                to={AssignedPerformancePlanManagement.PATH + "/" + record.id}
                key="edit">
                {(record.performancePlan! as SerializedEntity<PerformancePlan>)._instanceName}
              </Link>
            }}/>
            <Column title={this.props.intl.formatMessage({id: "assessmentPeriod"})}
                    dataIndex={"startDate"}
                    key={"startDate"} render={(text, record, index) => {
              return (React.createElement("div", null, moment(text).format("YYYY")));
            }}/>
          </Table>
        </Section>
      </Page>
    );
  }

  getRecordById(id: string): SerializedEntity<AssignedPerformancePlan> {
    const record:
      | SerializedEntity<AssignedPerformancePlan>
      | undefined = this.dataCollection.items.find(record => record.id === id);

    if (!record) {
      throw new Error("Cannot find entity with id " + id);
    }

    return record;
  }

  handleRowSelectionChange = (selectedRowKeys: string[]) => {
    this.selectedRowKey = selectedRowKeys[0];
  };

  deleteSelectedRow = () => {
    this.showDeletionDialog(this.getRecordById(this.selectedRowKey!));
  };
}

const EnumCell = (text: string, propertyInfo: MetaPropertyInfo, mainStore: MainStore) => {
  const caption = getEnumCaption(text, propertyInfo, mainStore.enums!);
  if (caption) {
    return (React.createElement("div", null, caption));
  } else {
    return React.createElement("div", null);
  }
};

const AssignedPerformancePlanList = injectIntl(
  AssignedPerformancePlanListComponent
);

export default AssignedPerformancePlanList;
