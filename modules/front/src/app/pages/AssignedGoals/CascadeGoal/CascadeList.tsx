import * as React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

import { observable } from "mobx";

import { Modal, Button } from "antd";

import {
  collection,
  injectMainStore,
  MainStoreInjected,
  DataTable
} from "@cuba-platform/react";

import { AssignedPerformancePlan } from "../../../../cuba/entities/base/tsadv$AssignedPerformancePlan";
import { SerializedEntity } from "@cuba-platform/rest";
import { CascadeGoalManagement } from "./CascadeGoalManagement";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";

@injectMainStore
@observer
class CascadeListComponent extends React.Component<
  MainStoreInjected & WrappedComponentProps
> {
  dataCollection = collection<AssignedPerformancePlan>(
    AssignedPerformancePlan.NAME,
    { view: "_local", sort: "-updateTs" }
  );

  fields = [
    "result",

    "gzp",

    "startDate",

    "endDate",

    "kpiScore",

    "extraPoint",

    "finalScore",

    "companyBonus",

    "personalBonus",

    "finalBonus",

    "maxBonus",

    "adjustedBonus",

    "adjustedScore",

    "maxBonusPercent",

    "legacyId",

    "organizationBin",

    "integrationUserLogin",

    "requestNumber",

    "requestDate",

    "comment"
  ];

  @observable selectedRowKey: string | undefined;

  showDeletionDialog = (e: SerializedEntity<AssignedPerformancePlan>) => {
    Modal.confirm({
      title: this.props.intl.formatMessage(
        { id: "management.browser.delete.areYouSure" },
        { instanceName: e._instanceName }
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
        to={
          CascadeGoalManagement.PATH + "/" + CascadeGoalManagement.NEW_SUBPATH
        }
        key="create"
      >
        <Button
          htmlType="button"
          style={{ margin: "0 12px 12px 0" }}
          type="primary"
          icon="plus"
        >
          <span>
            <FormattedMessage id="management.browser.create" />
          </span>
        </Button>
      </Link>,
      <Link
        to={CascadeGoalManagement.PATH + "/" + this.selectedRowKey}
        key="edit"
      >
        <Button
          htmlType="button"
          style={{ margin: "0 12px 12px 0" }}
          disabled={!this.selectedRowKey}
          type="default"
        >
          <FormattedMessage id="management.browser.edit" />
        </Button>
      </Link>,
      <Button
        htmlType="button"
        style={{ margin: "0 12px 12px 0" }}
        disabled={!this.selectedRowKey}
        onClick={this.deleteSelectedRow}
        key="remove"
        type="default"
      >
        <FormattedMessage id="management.browser.remove" />
      </Button>
    ];

    return (
      <DataTable
        dataCollection={this.dataCollection}
        fields={this.fields}
        onRowSelectionChange={this.handleRowSelectionChange}
        hideSelectionColumn={true}
        buttons={buttons}
      />
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

const CascadeList = injectIntl(CascadeListComponent);

export default CascadeList;
