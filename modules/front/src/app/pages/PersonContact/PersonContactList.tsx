import * as React from "react";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";

import {observable} from "mobx";

import {Modal} from "antd";

import {collection, DataTable, injectMainStore, MainStoreInjected} from "@cuba-platform/react";

import {PersonContact} from "../../../cuba/entities/base/tsadv$PersonContact";
import {SerializedEntity} from "@cuba-platform/rest";
import {PersonContactManagement} from "./PersonContactManagement";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {RootStoreProp} from "../../store";
import Button, {ButtonType} from "../../components/Button/Button";

@inject("rootStore")
@injectMainStore
@observer
class PersonContactListComponent extends React.Component<MainStoreInjected & WrappedComponentProps & RootStoreProp> {
  componentDidMount(): void {
  }

  dataCollection = collection<PersonContact>(PersonContact.NAME, {
    view: "portal.my-profile",
    sort: "-updateTs",
    filter: {
      conditions: [{property: "personGroup.id", operator: "=", value: this.props.rootStore!.userInfo.personGroupId!}]
    }
  });

  fields = [
    "type",

    "contactValue",

    "startDate",

    "endDate",

  ];

  @observable selectedRowKey: string | undefined;

  showDeletionDialog = (e: SerializedEntity<PersonContact>) => {
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
          PersonContactManagement.PATH +
          "/" +
          PersonContactManagement.NEW_SUBPATH
        }
        key="create"
      >
        <Button
          // style={{margin: "0 12px 12px 0"}}
          buttonType={ButtonType.PRIMARY}>
          <span>
            <FormattedMessage id="cubaReact.dataTable.listEditor.addItem"/>
          </span>
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

  getRecordById(id: string): SerializedEntity<PersonContact> {
    const record:
      | SerializedEntity<PersonContact>
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

const PersonContactList = injectIntl(PersonContactListComponent);

export default PersonContactList;
