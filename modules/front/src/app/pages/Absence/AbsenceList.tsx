import * as React from "react";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";

import {observable} from "mobx";

import {Modal, Tabs} from "antd";

import {collection, DataTable, injectMainStore, MainStoreInjected} from "@cuba-platform/react";

import {AbsenceRequest} from "../../../cuba/entities/base/tsadv$AbsenceRequest";
import {SerializedEntity} from "@cuba-platform/rest";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {RootStoreProp} from "../../store";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import Button, {ButtonType} from "../../components/Button/Button";
import {AbsenceRequestManagement} from "../AbsenceRequest/AbsenceRequestManagement";
import {Absence} from "../../../cuba/entities/base/tsadv$Absence";

const {TabPane} = Tabs;

@injectMainStore
@inject("rootStore")
@observer
class AbsenceListComponent extends React.Component<MainStoreInjected & WrappedComponentProps & RootStoreProp> {

  dataCollection = collection<AbsenceRequest>(AbsenceRequest.NAME, {
    view: "absenceRequest.edit",
    sort: "-updateTs",
    filter: {
      conditions: [{property: "personGroup.id", operator: "=", value: this.props.rootStore!.userInfo.personGroupId!}]
    }
  });

  dataCollectionAbsence = collection<Absence>(Absence.NAME, {
    view: "absence.view",
    sort: "-updateTs",
    filter: {
      conditions: [{property: "personGroup.id", operator: "=", value: this.props.rootStore!.userInfo.personGroupId!}]
    }
  });

  absenceRequestFields = [
    "requestNumber",

    "type",

    "dateFrom",

    "dateTo",

    "status",

    "requestDate"
  ];

  absenceFields = [
    "type",

    "dateFrom",

    "dateTo",

    "absenceDays"
  ];

  @observable selectedRowKey: string | undefined;

  showDeletionDialog = (e: SerializedEntity<AbsenceRequest>) => {
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

  lastIndex = -1;

  renderColumn = (text: string, record: AbsenceRequest, index: number) => {
    if (text === record["requestNumber"] && this.lastIndex !== index) {
      this.lastIndex = index;
      return <Link to={AbsenceRequestManagement.PATH + "/" + record.id}>
        {text}
      </Link>
    }

    return text;
  }

  @observable
  pageName = "absence";

  render() {
    const createBtn = <Link
      to={AbsenceRequestManagement.PATH + "/" + AbsenceRequestManagement.NEW_SUBPATH}
      key="create">
      <Button buttonType={ButtonType.PRIMARY}
              style={{margin: "0 12px 12px 0"}}><span><FormattedMessage id="management.browser.create"/></span>
      </Button>
    </Link>;

    return (
      <Page pageName={this.props.intl.formatMessage({id: this.pageName})}>
        <Section size="large">
          <Tabs defaultActiveKey="1"
                onChange={activeKey => this.pageName = "absence" + (activeKey === "1" ? "" : "Request")}>
            <TabPane tab={this.props.intl.formatMessage({id: "absence"})} key="1">
              <div>
                <div style={{marginBottom: 16}}>
                  {createBtn}
                </div>
                <DataTable
                  dataCollection={this.dataCollectionAbsence}
                  fields={this.absenceFields}
                  hideSelectionColumn={true}
                />
              </div>
            </TabPane>
            <TabPane tab={this.props.intl.formatMessage({id: "absenceRequest"})} key="2">
              <div>
                <DataTable
                  dataCollection={this.dataCollection}
                  fields={this.absenceRequestFields}
                  onRowSelectionChange={this.handleRowSelectionChange}
                  hideSelectionColumn={true}
                  columnProps={{
                    render: this.renderColumn
                  }}
                />
              </div>
            </TabPane>
          </Tabs>
        </Section>
      </Page>
    );
  }

  getRecordById(id: string): SerializedEntity<AbsenceRequest> {
    const record:
      | SerializedEntity<AbsenceRequest>
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

const AbsenceList = injectIntl(AbsenceListComponent);

export default AbsenceList;
