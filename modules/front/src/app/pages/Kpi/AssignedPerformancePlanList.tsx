import * as React from "react";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";

import {observable} from "mobx";

import {Card, Modal} from "antd";

import {collection, DataTable, injectMainStore, MainStoreInjected} from "@cuba-platform/react";

import {AssignedPerformancePlan} from "../../../cuba/entities/base/tsadv$AssignedPerformancePlan";
import {SerializedEntity} from "@cuba-platform/rest";
import {AssignedPerformancePlanManagement} from "./AssignedPerformancePlanManagement";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {RootStoreProp} from "../../store";
import Button, {ButtonType} from "../../components/Button/Button";

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
    "performancePlan",

    "status",

    "startDate",

    "endDate"
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
    const buttons = [
      <Link
        to={AssignedPerformancePlanManagement.PATH + "/" + this.selectedRowKey}
        key="edit"
      >
        <Button
          buttonType={ButtonType.FOLLOW}
          htmlType="button"
          style={{margin: "0 12px 12px 0"}}
          disabled={!this.selectedRowKey}
          type="default"
        >
          <FormattedMessage id="management.browser.edit"/>
        </Button>
      </Link>
    ];

    return (
      <Card bordered={false}>
        <DataTable
          dataCollection={this.dataCollection}
          fields={this.fields}
          onRowSelectionChange={this.handleRowSelectionChange}
          hideSelectionColumn={true}
          buttons={buttons}
        />
      </Card>
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

const AssignedPerformancePlanList = injectIntl(
  AssignedPerformancePlanListComponent
);

export default AssignedPerformancePlanList;
