import * as React from "react";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";

import {observable} from "mobx";

import {Button, Icon, Modal, Spin} from "antd";

import {collection, injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {OrgStructureRequest} from "../../../cuba/entities/base/tsadv_OrgStructureRequest";
import {SerializedEntity} from "@cuba-platform/rest";
import {OrgStructureRequestManagement} from "./OrgStructureRequestManagement";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import {RootStoreProp} from "../../store";
import {restServices} from "../../../cuba/services";
import DataTableFormat from "../../components/DataTable/intex";

@injectMainStore
@inject("rootStore")
@observer
class OrgStructureRequestListComponent extends React.Component<MainStoreInjected & WrappedComponentProps & RootStoreProp> {

  @observable selectedData?: SerializedEntity<OrgStructureRequest>;

  @observable hasPermitToCreate: boolean = false;

  dataCollection = collection<OrgStructureRequest>(
    OrgStructureRequest.NAME, {
      view: "orgStructureRequest-edit",
      sort: "-requestNumber",
      filter: {
        conditions: [{
          property: "author.id",
          operator: "=",
          value: this.props.rootStore!.userInfo.personGroupId!
        }]
      }
    }
  );

  fields = ["requestNumber", "requestDate", "status", "company", "department", "author"];

  render() {
    const buttons = [];

    if (this.hasPermitToCreate)
      buttons.push(<Link
        to={OrgStructureRequestManagement.PATH + "/" + OrgStructureRequestManagement.NEW_SUBPATH}
        key="create">
        <Button
          htmlType="button"
          style={{margin: "0 12px 12px 0"}}
          type="primary">
          <Icon type="plus"/>
          <FormattedMessage id="management.browser.create"/>
        </Button>
      </Link>);

    buttons.push(<Button
      htmlType="button"
      style={{margin: "0 12px 12px 0"}}
      disabled={!this.selectedData || !this.selectedData.status || this.selectedData.status.code !== 'DRAFT'}
      onClick={this.deleteSelectedRow}
      key="remove"
      type="default">
      <Icon type="delete"/>
      <FormattedMessage id="management.browser.remove"/>
    </Button>);

    return (
      <Page>
        <Section size={"large"}>
          <Spin spinning={this.dataCollection.status === 'LOADING'}>
            <DataTableFormat dataCollection={this.dataCollection}
                             fields={this.fields}
                             hideSelectionColumn={true}
                             onRowSelectionChange={selectedRowKeys => this.selectedData = this.getRecordById(selectedRowKeys[0])}
                             buttons={buttons}
                             render={[
                               {
                                 column: this.fields[0],
                                 render: (text, record) =>
                                   <Link to={OrgStructureRequestManagement.PATH + "/" + record.id}
                                         key="edit">{text}</Link>
                               }
                             ]}
            />
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
        this.selectedData = undefined;

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

  deleteSelectedRow = () => {
    this.showDeletionDialog(this.selectedData!);
  };

  componentDidMount(): void {
    restServices.orgStructureService.hasPermitToCreate()
      .then((hasPermitToCreate: boolean) => {
        this.hasPermitToCreate = hasPermitToCreate;
      });
  }
}

const OrgStructureRequestList = injectIntl(OrgStructureRequestListComponent);

export default OrgStructureRequestList;
