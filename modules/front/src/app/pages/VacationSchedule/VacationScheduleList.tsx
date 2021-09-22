import * as React from "react";
import {inject, observer} from "mobx-react";
import {VacationScheduleRequest} from "../../../cuba/entities/base/tsadv_VacationScheduleRequest";
import {Link} from "react-router-dom";
import {VacationScheduleRequestManagement} from "../VacationScheduleRequest/VacationScheduleRequestManagement";
import {serviceCollection} from "../../util/ServiceDataCollectionStore";
import {restServices} from "../../../cuba/services";
import {RootStoreProp} from "../../store";
import {Button, Icon, Modal, Spin, Table} from "antd";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {action, observable} from "mobx";
import {SerializedEntity} from "@cuba-platform/rest";
import {getCubaREST, handleTableChange, injectMainStore, MainStoreInjected, Msg} from "@cuba-platform/react";
import {PersonContact} from "../../../cuba/entities/base/tsadv$PersonContact";
import moment from "moment";
import {formatDate, JSON_DATE_TIME_FORMAT} from "../../util/Date/Date";
import {runReport} from "../../util/reportUtil";
import {Organization} from "../../../cuba/entities/base/base$Organization";
import Column from "antd/es/table/Column";
import {AssignmentExt} from "../../../cuba/entities/base/base$AssignmentExt";
import {PaginationConfig} from "antd/es/pagination";
import {SorterResult} from "antd/es/table";

@inject("rootStore")
@injectMainStore
@observer
class VacationScheduleListComponent extends React.Component<MainStoreInjected & WrappedComponentProps & RootStoreProp> {

  dataCollectionVacationSchedule = serviceCollection<VacationScheduleRequest>(
    (pagination) => restServices.vacationScheduleRequestService.getChildVacationSchedule({
      limit: pagination.limit,
      offset: pagination.offset
    }),
    VacationScheduleRequest.NAME);

  reportCode = 'DEPARTMENT_VACATION_SCHEDULE';

  @observable
  onRunningReport = false;

  @observable
  onRunningApprove = false;

  @observable
  selectedRowKey: string | undefined;

  selectedRowKeys: string[] | undefined;

  @observable
  selectedData: SerializedEntity<VacationScheduleRequest> | undefined;

  vacationScheduleFields = [
    "requestNumber",

    "personGroup",

    "startDate",

    "endDate",

    "absenceDays",

    "assignmentSchedule",

    "approved",

    "sentToOracle",
  ];

  @action
  handleChange = (pagination: PaginationConfig, tableFilters: Record<string, string[]>, sorter: SorterResult<any>): void => {
    handleTableChange({
      pagination: pagination,
      filters: tableFilters,
      sorter: sorter,
      defaultSort: '-updateTs',
      fields: this.vacationScheduleFields,
      mainStore: this.props.mainStore!,
      dataCollection: this.dataCollectionVacationSchedule
    });
  };

  approve = async () => {
    this.onRunningApprove = true;
    if (this.selectedRowKeys)
      await restServices.vacationScheduleRequestService
        .approveVacationRequest({vacations: this.selectedRowKeys});
    this.onRunningApprove = false;
    this.dataCollectionVacationSchedule.load();
  }

  render() {
    return (
      <div style={{margin: 10}}>

        <div>
          <Link
            to={VacationScheduleRequestManagement.PATH + "/" + VacationScheduleRequestManagement.NEW_SUBPATH}>
            <Button key="vacationScheduleRequestCreateBtn"
                    type="primary"
                    style={{margin: "0 12px 12px 0"}}>
              <span><FormattedMessage id="new.request"/></span>
            </Button>
          </Link>
          <Link
            to={VacationScheduleRequestManagement.PATH + "/" +
            (this.selectedData && this.selectedData.id) + '/' +
            VacationScheduleRequestManagement.GANT_CHART}
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
          <Button
            htmlType="button"
            style={{margin: "0 12px 12px 0"}}
            onClick={this.runReport}
            key="report"
            disabled={this.onRunningReport}
            type="default">
            {this.onRunningReport
              ? <Spin/>
              : <Icon type="excel"/>}
            <FormattedMessage id="report"/>
          </Button>
          <Button
            htmlType="button"
            style={{margin: "0 12px 12px 0"}}
            onClick={this.approve}
            key="approve"
            disabled={this.onRunningReport}
            type="default">
            {this.onRunningReport
              ? <Spin/>
              : <></>}
            <FormattedMessage id="vacationSchedule.btn.approve"/>
          </Button>
        </div>

        <Table dataSource={this.dataCollectionVacationSchedule.items.slice()}
               rowSelection={{
                 type: 'checkbox',
                 onChange: this.handleRowSelectionChange
               }}
               onChange={this.handleChange}
               pagination={{
                 showSizeChanger: true,
                 total: this.dataCollectionVacationSchedule.count,
               }}
               rowKey={'id'}>
          <Column key='requestNumber'
                  title={<Msg entityName={VacationScheduleRequest.NAME} propertyName='requestNumber'/>}
                  render={(text, record: VacationScheduleRequest) => <Link
                    to={VacationScheduleRequestManagement.PATH + "/" + record.id + "/" + VacationScheduleRequestManagement.GANT_CHART}>
                    {text}
                  </Link>}
                  dataIndex={'requestNumber'}/>
          <Column key='personGroup'
                  title={<Msg entityName={VacationScheduleRequest.NAME} propertyName='personGroup'/>}
                  dataIndex={'personGroup._instanceName'}/>
          <Column key='positionGroup'
                  title={<Msg entityName={AssignmentExt.NAME} propertyName='positionGroup'/>}
                  render={(text, record: VacationScheduleRequest) => record.personGroup!.primaryAssignment!.positionGroup!['_instanceName']}/>
          <Column key='organizationGroup'
                  title={<Msg entityName={AssignmentExt.NAME} propertyName='organizationGroup'/>}
                  render={(text, record: VacationScheduleRequest) => record.personGroup!.primaryAssignment!.organizationGroup!['_instanceName']}/>
          <Column key='startDate'
                  title={<Msg entityName={VacationScheduleRequest.NAME} propertyName='startDate'/>}
                  render={(text) => formatDate(text)}
                  dataIndex={'startDate'}/>
          <Column key='endDate'
                  title={<Msg entityName={VacationScheduleRequest.NAME} propertyName='endDate'/>}
                  render={(text) => formatDate(text)}
                  dataIndex={'endDate'}/>
          <Column key='absenceDays'
                  title={<Msg entityName={VacationScheduleRequest.NAME} propertyName='absenceDays'/>}
                  dataIndex={'absenceDays'}/>
          <Column key='assignmentSchedule'
                  title={<Msg entityName={VacationScheduleRequest.NAME} propertyName='assignmentSchedule'/>}
                  dataIndex={'assignmentSchedule._instanceName'}/>
          <Column key='approved'
                  title={<Msg entityName={VacationScheduleRequest.NAME} propertyName='approved'/>}
                  render={(text, record: VacationScheduleRequest) => <FormattedMessage
                    id={record.approved ? 'cubaReact.dataTable.yes' : 'cubaReact.dataTable.no'}/>}
                  dataIndex={'approved'}/>
          <Column key='sentToOracle'
                  title={<Msg entityName={VacationScheduleRequest.NAME} propertyName='sentToOracle'/>}
                  dataIndex={'sentToOracle'}/>
        </Table>
      </div>
    );
  }

  runReport = async () => {
    this.onRunningReport = true;

    let organization = undefined;

    await getCubaREST()!.searchEntities<Organization>(Organization.NAME, {
      conditions: [{
        property: 'startDate',
        value: moment().format(JSON_DATE_TIME_FORMAT),
        operator: '<='
      }, {
        property: 'endDate',
        value: moment().format(JSON_DATE_TIME_FORMAT),
        operator: '>='
      }, {
        property: 'group.id',
        value: this.props.rootStore!.userInfo.organizationGroupId!,
        operator: '='
      }]
    }, {
      limit: 1
    }).then(value => organization = value[0].id!)

    await runReport(this.reportCode,
      {
        parameters: [{
          name: 'org',
          value: organization
        }, {
          name: 'dat',
          value: moment().format(JSON_DATE_TIME_FORMAT),
        }]
      },
      this.props.intl);

    this.onRunningReport = false;
  }

  deleteSelectedRow = () => {
    this.showDeletionDialog(this.selectedData!);
  };

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
    this.selectedRowKeys = selectedRowKeys;
    this.selectedRowKey = selectedRowKeys.length === 1 ? selectedRowKeys[0] : undefined;
    this.selectedData = this.selectedRowKey ? this.getRecordById(this.selectedRowKey) : undefined;
  };

  componentDidMount() {
    this.props.rootStore!.vacationRequestStore.setType('manager');
    this.dataCollectionVacationSchedule.load();
    this.props.rootStore!.assistantTeamInfo.active = false;
  }
}

const VacationScheduleList = injectIntl(VacationScheduleListComponent);

export default VacationScheduleList;
