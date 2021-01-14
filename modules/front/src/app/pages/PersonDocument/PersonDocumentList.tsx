import * as React from "react";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";

import {observable} from "mobx";

import {Modal} from "antd";

import {collection, DataTable, injectMainStore, MainStoreInjected} from "@cuba-platform/react";

import {PersonDocument} from "../../../cuba/entities/base/tsadv$PersonDocument";
import {SerializedEntity} from "@cuba-platform/rest";
import {PersonDocumentManagement} from "./PersonDocumentManagement";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {RootStoreProp} from "../../store";
import Button, {ButtonType} from "../../components/Button/Button";

@inject("rootStore")
@injectMainStore
@observer
class PersonDocumentListComponent extends React.Component<MainStoreInjected & WrappedComponentProps & RootStoreProp> {
  dataCollection = collection<PersonDocument>(PersonDocument.NAME, {
    view: "portal.my-profile",
    filter: {
      conditions: [{
        property: "personGroup",
        operator: "=",
        value: this.props.rootStore!.userInfo.personGroupId
      }]
    },
    sort: "-updateTs"
  });

  fields = [
    "documentType",

    "expiredDate",

    "documentNumber",

    "issuedBy",

    "series"
  ];

  @observable selectedRowKey: string | undefined;

  showDeletionDialog = (e: SerializedEntity<PersonDocument>) => {
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
        to={
          PersonDocumentManagement.PATH +
          "/" +
          PersonDocumentManagement.NEW_SUBPATH
        }
        key="create"
      >
        <Button style={{margin: "0 12px 12px 0"}} buttonType={ButtonType.FOLLOW}>
          <span>
            <FormattedMessage id="management.browser.create"/>
          </span>
        </Button>
      </Link>,
      <Link
        to={PersonDocumentManagement.PATH + "/" + this.selectedRowKey}
        key="edit">
        <Button  buttonType={ButtonType.FOLLOW}
          style={{margin: "0 12px 12px 0"}}
          disabled={!this.selectedRowKey}>
          <FormattedMessage id="management.browser.edit"/>
        </Button>
      </Link>
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

  getRecordById(id: string): SerializedEntity<PersonDocument> {
    const record:
      | SerializedEntity<PersonDocument>
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

const PersonDocumentList = injectIntl(PersonDocumentListComponent);

export default PersonDocumentList;
