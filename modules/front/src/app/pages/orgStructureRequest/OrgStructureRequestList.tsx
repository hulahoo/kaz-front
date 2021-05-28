import * as React from "react";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";

import {action, observable} from "mobx";

import {Button, Col, Icon, Modal, Row, Spin, Table} from "antd";

import {
  collection,
  ComparisonType,
  generateDataColumn, handleTableChange,
  injectMainStore,
  MainStoreInjected,
  Msg
} from "@cuba-platform/react";
import {OrgStructureRequest} from "../../../cuba/entities/base/tsadv_OrgStructureRequest";
import {SerializedEntity} from "@cuba-platform/rest";
import {OrgStructureRequestManagement} from "./OrgStructureRequestManagement";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import Column from "antd/es/table/Column";
import {PersonGroupExt} from "../../../cuba/entities/base/base$PersonGroupExt";
import {OrganizationGroupExt} from "../../../cuba/entities/base/base$OrganizationGroupExt";
import {DicCompany} from "../../../cuba/entities/base/base_DicCompany";
import {DicRequestStatus} from "../../../cuba/entities/base/tsadv$DicRequestStatus";
import {RootStoreProp} from "../../store";
import {restServices} from "../../../cuba/services";
import {PaginationConfig} from "antd/es/pagination";
import {SorterResult} from "antd/es/table";

@injectMainStore
@inject("rootStore")
@observer
class OrgStructureRequestListComponent extends React.Component<MainStoreInjected & WrappedComponentProps & RootStoreProp> {

  @observable selectedRowKey: string | undefined;

  @observable hasPermitToCreate: boolean = false;

  @observable.ref filters: Record<string, string[]> | undefined;

  @observable
  operator: ComparisonType | undefined;

  @observable
  value: any;

  @action
  handleOperatorChange = (operator: ComparisonType) => this.operator = operator;

  @action
  handleValueChange = (value: any) => this.value = value;

  @action
  handleChange = (pagination: PaginationConfig, tableFilters: Record<string, string[]>, sorter: SorterResult<OrgStructureRequest>): void => {
    this.filters = tableFilters;
    handleTableChange({
      pagination: pagination,
      filters: tableFilters,
      sorter: sorter,
      defaultSort: '-updateTs',
      fields: this.fields,
      mainStore: this.props.mainStore!,
      dataCollection: this.dataCollection
    });
  };

  dataCollection = collection<OrgStructureRequest>(
    OrgStructureRequest.NAME, {
      view: "orgStructureRequest-edit",
      sort: "requestNumber",
      filter: {
        conditions: [{
          property: "author.id",
          operator: "=",
          value: this.props.rootStore!.userInfo.personGroupId!
        }]
      }
    }
  );

  fields = ["requestNumber", "requestDate", "company", "department", "author"];

  render() {
    const buttons = [
      this.hasPermitToCreate
        ? <Link
          to={OrgStructureRequestManagement.PATH + "/" + OrgStructureRequestManagement.NEW_SUBPATH}
          key="create">
          <Button
            htmlType="button"
            style={{margin: "0 12px 12px 0"}}
            type="primary">
            <Icon type="plus"/>
            <FormattedMessage id="management.browser.create"/>
          </Button>
        </Link> : null
    ];

    return (
      <Page>
        <Section size={"large"}>
          <Spin spinning={this.dataCollection.status === 'LOADING'}>
            <Row style={{"margin": '10px 0'}}>
              <Col span={24}>
                {buttons}
              </Col>
            </Row>
            <Table dataSource={Array.from(this.dataCollection.items || '')}
                   pagination={false}
                   onChange={this.handleChange}
                   size="default" bordered={false} rowKey="id" columns={[
              {
                //TODO: фильтр не работает, поскольку у кубы не возможности фильтровать long
                ...generateDataColumn({
                  enableFilter: true,
                  propertyName: 'requestNumber',
                  entityName: this.dataCollection.entityName,
                  filters: this.filters,
                  operator: this.operator,
                  onOperatorChange: this.handleOperatorChange,
                  value: this.value,
                  onValueChange: this.handleValueChange,
                  enableSorter: true,
                  mainStore: this.props.mainStore!
                }),
                render: (text, record: OrgStructureRequest): JSX.Element => {
                  return <Link to={OrgStructureRequestManagement.PATH + "/" + record.id}
                               key="edit">
                    {text}
                  </Link>
                }
              },
              generateDataColumn({
                propertyName: 'requestDate',
                entityName: this.dataCollection.entityName,
                filters: this.filters,
                operator: this.operator,
                onOperatorChange: this.handleOperatorChange,
                value: this.value,
                onValueChange: this.handleValueChange,
                enableSorter: true,
                mainStore: this.props.mainStore!,
                enableFilter: true
              }),
              generateDataColumn({
                propertyName: 'status',
                entityName: this.dataCollection.entityName,
                filters: this.filters,
                operator: this.operator,
                onOperatorChange: this.handleOperatorChange,
                value: this.value,
                onValueChange: this.handleValueChange,
                enableSorter: true,
                mainStore: this.props.mainStore!,
                enableFilter: true
              }),
              generateDataColumn({
                propertyName: 'company',
                entityName: this.dataCollection.entityName,
                filters: this.filters,
                operator: this.operator,
                onOperatorChange: this.handleOperatorChange,
                value: this.value,
                onValueChange: this.handleValueChange,
                enableSorter: true,
                mainStore: this.props.mainStore!,
                enableFilter: true
              }),
              generateDataColumn({
                propertyName: 'department',
                entityName: this.dataCollection.entityName,
                filters: this.filters,
                operator: this.operator,
                onOperatorChange: this.handleOperatorChange,
                value: this.value,
                onValueChange: this.handleValueChange,
                enableSorter: true,
                mainStore: this.props.mainStore!,
                enableFilter: true
              }),
              generateDataColumn({
                propertyName: 'author',
                entityName: this.dataCollection.entityName,
                filters: this.filters,
                operator: this.operator,
                onOperatorChange: this.handleOperatorChange,
                value: this.value,
                onValueChange: this.handleValueChange,
                enableSorter: true,
                mainStore: this.props.mainStore!,
                enableFilter: true
              })
            ]}/>
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
        this.selectedRowKey = undefined;

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

  componentDidMount(): void {
    restServices.orgStructureService.hasPermitToCreate()
      .then((hasPermitToCreate: boolean) => {
        this.hasPermitToCreate = hasPermitToCreate;
      });
  }
}

const OrgStructureRequestList = injectIntl(OrgStructureRequestListComponent);

export default OrgStructureRequestList;
