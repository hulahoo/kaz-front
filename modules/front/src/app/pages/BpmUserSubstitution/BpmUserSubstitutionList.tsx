import * as React from "react";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";

import {observable} from "mobx";

import {Button, Modal} from "antd";

import {collection, injectMainStore, MainStoreInjected} from "@cuba-platform/react";

import {BpmUserSubstitution} from "../../../cuba/entities/base/tsadv$BpmUserSubstitution";
import {SerializedEntity} from "@cuba-platform/rest";
import {BpmUserSubstitutionManagement} from "./BpmUserSubstitutionManagement";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import DataTableFormat from "../../components/DataTable/intex";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import {RootStoreProp} from "../../store";

@injectMainStore
@inject("rootStore")
@observer
class BpmUserSubstitutionListComponent extends React.Component<MainStoreInjected & WrappedComponentProps & RootStoreProp> {
  dataCollection = collection<BpmUserSubstitution>(BpmUserSubstitution.NAME, {
    filter: {
      conditions: [{
        property: 'user',
        operator: '=',
        value: this.props.rootStore!.userInfo!.id!
      }]
    },
    view: "bpmUserSubstitution-view",
    sort: "-updateTs"
  });

  fields = ["substitutedUser", "startDate", "endDate"];

  @observable selectedRowKey: string | undefined;

  showDeletionDialog = (e: SerializedEntity<BpmUserSubstitution>) => {
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
          BpmUserSubstitutionManagement.PATH +
          "/" +
          BpmUserSubstitutionManagement.NEW_SUBPATH
        }
        key="create"
      >
        <Button
          htmlType="button"
          style={{margin: "0 12px 12px 0"}}
          type="primary"
          icon="plus"
        >
          <span>
            <FormattedMessage id="management.browser.create"/>
          </span>
        </Button>
      </Link>,
      <Link
        to={BpmUserSubstitutionManagement.PATH + "/" + this.selectedRowKey}
        key="edit"
      >
        <Button
          htmlType="button"
          style={{margin: "0 12px 12px 0"}}
          disabled={!this.selectedRowKey}
          type="default"
        >
          <FormattedMessage id="management.browser.edit"/>
        </Button>
      </Link>,
      <Button
        htmlType="button"
        style={{margin: "0 12px 12px 0"}}
        disabled={!this.selectedRowKey}
        onClick={this.deleteSelectedRow}
        key="remove"
        type="default"
      >
        <FormattedMessage id="management.browser.remove"/>
      </Button>
    ];

    return (
      <Page pageName={this.props.intl.formatMessage({id: "bpmUserSubstitution"})}>
        <Section size="large">
          <DataTableFormat
            dataCollection={this.dataCollection}
            fields={this.fields}
            onRowSelectionChange={this.handleRowSelectionChange}
            hideSelectionColumn={true}
            buttons={buttons}
          />
        </Section>
      </Page>
    );
  }

  getRecordById(id: string): SerializedEntity<BpmUserSubstitution> {
    const record:
      | SerializedEntity<BpmUserSubstitution>
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

const BpmUserSubstitutionList = injectIntl(BpmUserSubstitutionListComponent);

export default BpmUserSubstitutionList;
