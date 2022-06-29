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

import { ConcourseRequestAttachments } from "../../../../cuba/entities/base/tsadv_ConcourseRequestAttachments";
import { SerializedEntity } from "@cuba-platform/rest";
import { ConcourseRequestAttachmentsManagement } from "./ConcourseRequestAttachmentsManagement";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";
import ConcourseRequestAttachmentsEdit from "./ConcourseRequestAttachmentsEdit";

type EditorProps = {
  entityId: string;
};

@injectMainStore
@observer
class ConcourseRequestAttachmentsListComponent extends React.Component<
  MainStoreInjected & WrappedComponentProps & EditorProps
> {
  dataCollection = collection<ConcourseRequestAttachments>(
    ConcourseRequestAttachments.NAME,
    { view: "concourseRequestAttachments-view", sort: "-updateTs" }
  );

  fields = [
    "comments",

    "legacyId",

    "organizationBin",

    "integrationUserLogin",

    "attachment",

    "concourseRequest"
  ];

  @observable selectedRowKey: string | undefined;

  @observable isModalVisible = false;

  showDeletionDialog = (e: SerializedEntity<ConcourseRequestAttachments>) => {
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
      <Button
        key="create"
        htmlType="button"
        style={{ margin: "0 12px 12px 0" }}
        type="primary"
        icon="plus"
        onClick={() => (this.isModalVisible = true)}
      >
        <span>
          <FormattedMessage id="management.browser.create" />
        </span>
      </Button>,
      <Link
        to={
          ConcourseRequestAttachmentsManagement.PATH + "/" + this.selectedRowKey
        }
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
      <div>
        <DataTable
          dataCollection={this.dataCollection}
          fields={this.fields}
          onRowSelectionChange={this.handleRowSelectionChange}
          hideSelectionColumn={true}
          buttons={buttons}
        />
        {/*<ConcourseRequestAttachmentsEdit isModalVisible={this.isModalVisible} entityId={this.props.entityId} />*/}
      </div>
    );
  }

  getRecordById(id: string): SerializedEntity<ConcourseRequestAttachments> {
    const record:
      | SerializedEntity<ConcourseRequestAttachments>
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

const ConcourseRequestAttachmentsList = injectIntl(
  ConcourseRequestAttachmentsListComponent
);

export default ConcourseRequestAttachmentsList;
