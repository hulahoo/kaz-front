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
import {
  ComparisonType,
  getCubaREST,
  injectMainStore,
  MainStoreInjected,
  Msg,
  setPagination,
  setSorter
} from "@cuba-platform/react";
import {PersonContact} from "../../../cuba/entities/base/tsadv$PersonContact";
import moment from "moment";
import {formatDate, JSON_DATE_TIME_FORMAT} from "../../util/Date/Date";
import {runReport} from "../../util/reportUtil";
import CustomFilter, {
  enumFilter,
  FilterEntityValue,
  FilterValue,
  setFilters
} from "../../components/querySettings/CustomFilter";
import {Organization} from "../../../cuba/entities/base/base$Organization";
import Column from "antd/es/table/Column";
import {AssignmentExt} from "../../../cuba/entities/base/base$AssignmentExt";
import {PaginationConfig} from "antd/es/pagination";
import {SorterResult} from "antd/es/table";
import {EntitiesResult, QuerySettings} from "../../components/querySettings";
//@ts-ignore
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

export type VacationScheduleListProps = {
  positionGroupId?: string
  organizationGroupId?: string
}

@inject("rootStore")
@injectMainStore
@observer
class VacationScheduleListComponent extends React.Component<VacationScheduleListProps & MainStoreInjected & WrappedComponentProps & RootStoreProp> {

  dataCollectionVacationSchedule = serviceCollection<VacationScheduleRequest>(
    (pagination) => this.getChildVacationSchedule(pagination),
    VacationScheduleRequest.NAME);

  getChildVacationSchedule = (querySettings: QuerySettings): Promise<EntitiesResult<VacationScheduleRequest>> => {
    return restServices.vacationScheduleRequestService
      .getPositionChildVacationSchedule(
        querySettings,
        this.getPositionGroup()
      );
  }

  getPositionGroup = () => {
    if (this.props.positionGroupId) return this.props.positionGroupId;
    return this.props.rootStore!.userInfo!.positionGroupId!
  }

  reportCode = 'DEPARTMENT_VACATION_SCHEDULE';

  @observable
  filterValues = new Map<string, FilterValue>();

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

    "positionGroup",

    "startDate",

    "endDate",

    "absenceDays",

    "assignmentSchedule",

    "approved",

    "sentToOracle",
  ];


  customFilters = new Map();

  @observable.ref filters: Record<string, string[]> | undefined;
  @observable operator: ComparisonType | undefined;
  @observable value: any;

  @action
  handleOperatorChange = (operator: ComparisonType) => this.operator = operator;

  @action
  handleValueChange = (value: any) => this.value = value;

  @action
  handleChange = (pagination: PaginationConfig, tableFilters: Record<string, string[]>, sorter: SorterResult<any>): void => {
    // console.log(tableFilters);

    // tableFilters = tableFilters.

    // tableFilters

    // tableFilters['sentToOracle'] = tableFilters['sentToOracle'].join(',');
    // handleTableChange({
    //   pagination: pagination,
    //   filters: tableFilters,
    //   sorter: sorter,
    //   defaultSort: '-updateTs',
    //   fields: this.vacationScheduleFields,
    //   mainStore: this.props.mainStore!,
    //   dataCollection: this.dataCollectionVacationSchedule
    // });
    setFilters(tableFilters, this.vacationScheduleFields, this.props.mainStore!, this.dataCollectionVacationSchedule, this.getEntityName);
    setSorter(sorter, '-updateTs', this.dataCollectionVacationSchedule);
    setPagination(pagination, this.dataCollectionVacationSchedule);
    this.dataCollectionVacationSchedule.load();
  };

  getEntityName = (property: string) => {
    if (property === 'positionGroup' || property === 'organizationGroup') return AssignmentExt.NAME;
    return this.dataCollectionVacationSchedule.entityName;
  }

  approve = async () => {
    this.onRunningApprove = true;
    if (this.selectedRowKeys)
      await restServices.vacationScheduleRequestService
        .approveVacationRequest({vacations: this.selectedRowKeys});
    this.onRunningApprove = false;
    this.dataCollectionVacationSchedule.load();
  }

  @observable
  searchText?: string;

  handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    confirm();
  };

  handleReset = (clearFilters: any) => {
    clearFilters();
  };

  handleChangeFilterValue = (entityProperty: string, filterValue: FilterValue) => this.filterValues.set(entityProperty, filterValue);

  getFilterValue = (property: string) => this.filterValues.get(property);

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
            disabled={this.onRunningApprove}
            type="default">
            {this.onRunningApprove
              ? <Spin/>
              : <></>}
            <FormattedMessage id="vacationSchedule.btn.approve"/>
          </Button>
          <div style={{display:'inline'}}>
            <ReactHTMLTableToExcel id="test-table-xls-button"
                                   className="ant-btn ant-btn-default"
                                   table="table-to-xls"
                                   filename={new Date().toDateString()}
                                   sheet="tablexls"
                                   buttonText="Excel"/>
          </div>
        </div>

        <table id={"table-to-xls"}>
          <Table dataSource={this.dataCollectionVacationSchedule.items.slice()}
                 rowSelection={{
                   type: 'checkbox',
                   onChange: this.handleRowSelectionChange
                 }}
                 loading={this.dataCollectionVacationSchedule.status === 'LOADING'}
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
                    sorter
                    filterDropdown={props => <CustomFilter filterProps={props}
                                                           onChangeValue={this.handleChangeFilterValue}
                                                           filterValue={this.getFilterValue}
                                                           entityName={VacationScheduleRequest.NAME}
                                                           entityProperty={'requestNumber'}/>}
                    dataIndex={'requestNumber'}/>
            <Column key='personGroup'
                    title={<Msg entityName={VacationScheduleRequest.NAME} propertyName='personGroup'/>}
                    filterDropdown={props => <CustomFilter filterProps={props}
                                                           onChangeValue={this.handleChangeFilterValue}
                                                           filterValue={this.getFilterValue}
                                                           loadFilterValues={this.loadPersonGroupFilterValues}
                                                           entityName={VacationScheduleRequest.NAME}
                                                           entityProperty={'personGroup'}/>}
                    dataIndex={'personGroup._instanceName'}/>
            <Column key='positionGroup'
                    title={<Msg entityName={AssignmentExt.NAME} propertyName='positionGroup'/>}
                    filterDropdown={props => <CustomFilter filterProps={props}
                                                           onChangeValue={this.handleChangeFilterValue}
                                                           filterValue={this.getFilterValue}
                                                           loadFilterValues={this.loadPositionGroupFilterValues}
                                                           entityName={AssignmentExt.NAME}
                                                           entityProperty={'positionGroup'}/>}
                    render={(text, record: VacationScheduleRequest) => record.personGroup!.primaryAssignment!.positionGroup!['_instanceName']}/>
            <Column key='organizationGroup'
                    title={<Msg entityName={AssignmentExt.NAME} propertyName='organizationGroup'/>}
                    filterDropdown={props => <CustomFilter filterProps={props}
                                                           onChangeValue={this.handleChangeFilterValue}
                                                           filterValue={this.getFilterValue}
                                                           loadFilterValues={this.loadOrganizationGroupFilterValues}
                                                           entityName={AssignmentExt.NAME}
                                                           entityProperty={'organizationGroup'}/>}
                    render={(text, record: VacationScheduleRequest) => record.personGroup!.primaryAssignment!.organizationGroup!['_instanceName']}/>
            <Column key='startDate'
                    title={<Msg entityName={VacationScheduleRequest.NAME} propertyName='startDate'/>}
                    render={(text) => formatDate(text)}
                    sorter
                    filterDropdown={props => <CustomFilter filterProps={props}
                                                           onChangeValue={this.handleChangeFilterValue}
                                                           filterValue={this.getFilterValue}
                                                           entityName={VacationScheduleRequest.NAME}
                                                           entityProperty={'startDate'}/>}
                    dataIndex={'startDate'}/>
            <Column key='endDate'
                    title={<Msg entityName={VacationScheduleRequest.NAME} propertyName='endDate'/>}
                    render={(text) => formatDate(text)}
                    sorter
                    filterDropdown={props => <CustomFilter filterProps={props}
                                                           onChangeValue={this.handleChangeFilterValue}
                                                           filterValue={this.getFilterValue}
                                                           entityName={VacationScheduleRequest.NAME}
                                                           entityProperty={'endDate'}/>}
                    dataIndex={'endDate'}/>
            <Column key='absenceDays'
                    title={<Msg entityName={VacationScheduleRequest.NAME} propertyName='absenceDays'/>}
                    sorter
                    filterDropdown={props => <CustomFilter filterProps={props}
                                                           onChangeValue={this.handleChangeFilterValue}
                                                           filterValue={this.getFilterValue}
                                                           entityName={VacationScheduleRequest.NAME}
                                                           entityProperty={'absenceDays'}/>}
                    dataIndex={'absenceDays'}/>
            <Column key='assignmentSchedule'
                    filterDropdown={props => <CustomFilter filterProps={props}
                                                           onChangeValue={this.handleChangeFilterValue}
                                                           filterValue={this.getFilterValue}
                                                           entityName={VacationScheduleRequest.NAME}
                                                           entityProperty={'assignmentSchedule'}/>}
                    title={<Msg entityName={VacationScheduleRequest.NAME} propertyName='assignmentSchedule'/>}
                    dataIndex={'assignmentSchedule._instanceName'}/>
            <Column key='approved'
                    title={<Msg entityName={VacationScheduleRequest.NAME} propertyName='approved'/>}
                    sorter
                    filterDropdown={props => <CustomFilter filterProps={props}
                                                           onChangeValue={this.handleChangeFilterValue}
                                                           filterValue={this.getFilterValue}
                                                           entityName={VacationScheduleRequest.NAME}
                                                           entityProperty={'approved'}/>}
                    render={(text, record: VacationScheduleRequest) => <FormattedMessage
                      id={record.approved ? 'cubaReact.dataTable.yes' : 'cubaReact.dataTable.no'}/>}
                    dataIndex={'approved'}/>
            <Column key='sentToOracle'
                    title={<Msg entityName={VacationScheduleRequest.NAME} propertyName='sentToOracle'/>}
                    sorter
                    filters={enumFilter('sentToOracle', VacationScheduleRequest.NAME, this.props.mainStore!)}
                    dataIndex={'sentToOracle'}/>
          </Table>
        </table>
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
        value: this.props.organizationGroupId ? this.props.organizationGroupId : this.props.rootStore!.userInfo.organizationGroupId!,
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
    this.props.rootStore!.vacationRequestStore.setType(this.props.positionGroupId ? 'assistant' : 'manager');
    this.dataCollectionVacationSchedule.limit = 10;
    this.dataCollectionVacationSchedule.offset = 0;
    this.dataCollectionVacationSchedule.load();
    this.props.rootStore!.assistantTeamInfo.active = false;
  }

  loadPersonGroupFilterValues = (): Promise<Array<FilterEntityValue>> => {
    return restServices.vacationScheduleRequestService
      .filterEmployees({
        positionGroupId: this.getPositionGroup(),
        date: moment().format(JSON_DATE_TIME_FORMAT),
        view: '_minimal',
        isAssistant: this.props.rootStore!.assistantTeamInfo.active
      }).then(persons => persons.map(person => {
        return {
          value: person.id,
          caption: person._instanceName,
        }
      }));
  }

  loadPositionGroupFilterValues = (): Promise<Array<FilterEntityValue>> => {
    return restServices.vacationScheduleRequestService
      .filterPositions({
        positionGroupId: this.getPositionGroup(),
        date: moment().format(JSON_DATE_TIME_FORMAT),
        view: '_minimal',
        isAssistant: this.props.rootStore!.assistantTeamInfo.active
      }).then(positions => positions.map(position => {
        return {
          value: position.id,
          caption: position._instanceName,
        }
      }));
  }

  loadOrganizationGroupFilterValues = (): Promise<Array<FilterEntityValue>> => {
    return restServices.vacationScheduleRequestService
      .filterOrganizations({
        positionGroupId: this.getPositionGroup(),
        date: moment().format(JSON_DATE_TIME_FORMAT),
        view: '_minimal',
        isAssistant: this.props.rootStore!.assistantTeamInfo.active
      }).then(organizations => organizations.map(organization => {
        return {
          value: organization.id,
          caption: organization._instanceName,
        }
      }));
  }

}

const VacationScheduleList = injectIntl(VacationScheduleListComponent);

export default VacationScheduleList;
