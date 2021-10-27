import * as React from "react";
import {inject, observer} from "mobx-react";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";

import { observable } from "mobx";

import { Modal, Button } from "antd";

import {
  collection,
  injectMainStore,
  MainStoreInjected,
  DataTable
} from "@cuba-platform/react";

import { ConcourseRequestDocument } from "../../../../cuba/entities/base/tsadv_ConcourseRequestDocument";
import { SerializedEntity } from "@cuba-platform/rest";
import { ConcourseRequestDocumentManagement } from "./ConcourseRequestDocumentManagement";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps
} from "react-intl";
import {RequiredPersonGroupProps} from "../../PersonDocumentRequest/PersonDocumentRequestList";
import ConcourseRequestDocumentEdit from "./ConcourseRequestDocumentEdit";

type EditorProps={
  handleSubmit?: any
}

@inject("rootStore")
@injectMainStore
@observer
class ConcourseRequestDocumentListComponent extends React.Component<RequiredPersonGroupProps &
  MainStoreInjected & WrappedComponentProps & RouteComponentProps & EditorProps> {

  @observable
  dataCollection = collection<ConcourseRequestDocument>(
    ConcourseRequestDocument.NAME,
    { view: "concourseRequestDocument-edit", sort: "-updateTs", filter: {
        conditions: [{
          property: 'personGroup.id',
          operator: '=',
          value: this.props.personGroupId
        }]
      } }
  );

  fields = ["attachment", "requestDate", "comment",];

  @observable selectedRowKey: string | undefined;

  @observable isModalVisible = false

  showDeletionDialog = (e: SerializedEntity<ConcourseRequestDocument>) => {
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

  @observable
  entityId:string

  editDocumentWithCommentDialog = (e: SerializedEntity<ConcourseRequestDocument>)=>{
    this.entityId = e.id
    this.isModalVisible = true
  }

  addDocumentWithCommentDialog = () =>{
    return <Modal title={"Start"}>
      <ConcourseRequestDocumentEdit entityId={this.props.personGroupId}/>
    </Modal>
  }


  render() {
    const buttons = [

        <Button
          htmlType="button"
          style={{ margin: "0 12px 12px 0" }}
          type="primary"
          onClick={this.addNewAttachment}
          key={"create"}
          icon="plus"
        >
          <span>
            <FormattedMessage id="management.browser.create" />
          </span>
        </Button>
     ,
      <Button
        htmlType="button"
        style={{ margin: "0 12px 12px 0" }}
        disabled={!this.selectedRowKey}
        onClick={this.editSelectedRow}
        type="default"
        key={"edit"}
      >
        <FormattedMessage id="management.browser.edit" />
      </Button>,
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

    return (<div>
        <DataTable
          dataCollection={this.dataCollection}
          fields={this.fields}
          onRowSelectionChange={this.handleRowSelectionChange}
          hideSelectionColumn={true}
          buttons={buttons}
        />
        {this.isModalVisible && <ConcourseRequestDocumentEdit handleSubmit={this.props.handleSubmit!} isModalVisible={this.isModalVisible} entityId={this.entityId}/>
        }

    </div>

    );
  }

  getRecordById(id: string): SerializedEntity<ConcourseRequestDocument> {
    const record:
      | SerializedEntity<ConcourseRequestDocument>
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

  editSelectedRow = () => {
    this.editDocumentWithCommentDialog(this.getRecordById(this.selectedRowKey!))
  }

  addNewAttachment = () =>{
    this.entityId = "new"
    this.isModalVisible = true
  }

}

const ConcourseRequestDocumentList = injectIntl(
  ConcourseRequestDocumentListComponent
);

export default withRouter(ConcourseRequestDocumentList);
