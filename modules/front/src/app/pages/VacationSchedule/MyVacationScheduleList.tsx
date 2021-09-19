import * as React from "react";
import {inject, observer} from "mobx-react";
import {VacationScheduleRequest} from "../../../cuba/entities/base/tsadv_VacationScheduleRequest";
import DataTableFormat from "../../components/DataTable/intex";
import {Link} from "react-router-dom";
import {VacationScheduleRequestManagement} from "../VacationScheduleRequest/VacationScheduleRequestManagement";
import {collection, injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import {RootStoreProp} from "../../store";
import {observable} from "mobx";
import {SerializedEntity} from "@cuba-platform/rest";
import {PersonContact} from "../../../cuba/entities/base/tsadv$PersonContact";
import {Button, Icon, Modal} from "antd";

@injectMainStore
@inject("rootStore")
@observer
class MyVacationScheduleListComponent extends React.Component<MainStoreInjected & RootStoreProp & WrappedComponentProps> {

  @observable
  selectedRowKey: string | undefined;

  @observable
  selectedData: SerializedEntity<VacationScheduleRequest> | undefined;

  dataCollectionVacationSchedule = collection<VacationScheduleRequest>(VacationScheduleRequest.NAME, {
      view: "vacationScheduleRequest-edit",
      sort: "-requestNumber",
      filter: {
        conditions: [{property: "personGroup.id", operator: "=", value: this.props.rootStore!.userInfo.personGroupId!}]
      }
    }
  );

  vacationScheduleFields = [
    "requestNumber",

    "startDate",

    "endDate",

    "absenceDays",

    "assignmentSchedule",

    "approved",

    "sentToOracle"
  ];

  showDeletionDialog = (e: SerializedEntity<VacationScheduleRequest>) => {
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
        this.selectedData = undefined;
        this.selectedRowKey = undefined;

        return this.dataCollectionVacationSchedule.delete(e);
      }
    });
  };

  render() {
    return (
      <Page pageName={this.props.intl.formatMessage({id: "vacationScheduleRequest"})}>
        <Section size="large">
          <div>
            <div style={{marginBottom: 16}}>
              <Link
                to={VacationScheduleRequestManagement.PATH + "/" + VacationScheduleRequestManagement.NEW_SUBPATH}>
                <Button key="vacationScheduleRequestCreateBtn"
                        type="primary"
                        style={{margin: "0 12px 12px 0"}}>
                  <span><FormattedMessage id="new.request"/></span>
                </Button>
              </Link>
              <Link
                to={VacationScheduleRequestManagement.PATH + "/" + (this.selectedData && this.selectedData.id)}
                key="edit"
                aria-disabled={!this.selectedRowKey}>
                <Button style={{margin: "0 12px 12px 0"}} disabled={!this.selectedRowKey}><FormattedMessage
                  id="management.browser.edit"/></Button>
              </Link>
              <Button
                htmlType="button"
                style={{margin: "0 12px 12px 0"}}
                disabled={!this.selectedRowKey || !!this.selectedData!.approved || !!this.selectedData!.sentToOracle}
                onClick={this.deleteSelectedRow}
                key="remove"
                type="default">
                <Icon type="delete"/>
                <FormattedMessage id="management.browser.remove"/>
              </Button>
            </div>
            <DataTableFormat
              enableFiltersOnColumns={[]}
              hideSelectionColumn
              dataCollection={this.dataCollectionVacationSchedule}
              fields={this.vacationScheduleFields}
              onRowSelectionChange={this.handleRowSelectionChange}
              render={[{
                column: this.vacationScheduleFields[0],
                render: (text, record) => {
                  return <Link to={VacationScheduleRequestManagement.PATH + "/" + record.id}
                  >{text}</Link>
                }
              }]}
            />
          </div>
        </Section>
      </Page>
    );
  }

  deleteSelectedRow = () => {
    this.showDeletionDialog(this.selectedData!);
  };

  getRecordById(id: string): SerializedEntity<PersonContact> {
    const record:
      | SerializedEntity<PersonContact>
      | undefined = this.dataCollectionVacationSchedule.items.find(record => record.id === id);

    if (!record) {
      throw new Error("Cannot find entity with id " + id);
    }

    return record;
  }

  handleRowSelectionChange = (selectedRowKeys: string[]) => {
    this.selectedRowKey = selectedRowKeys[0];
    this.selectedData = this.selectedRowKey ? this.getRecordById(this.selectedRowKey) : undefined;
  };

  componentDidMount() {
    this.props.rootStore!.vacationRequestStore.setType('my');
    this.dataCollectionVacationSchedule.load();
  }
}

const MyVacationScheduleList = injectIntl(MyVacationScheduleListComponent);

export default MyVacationScheduleList;
