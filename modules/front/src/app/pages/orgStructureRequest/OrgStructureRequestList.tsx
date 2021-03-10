import * as React from "react";
import {inject, observer} from "mobx-react";
import {Link, RouteComponentProps} from "react-router-dom";

import {observable} from "mobx";

import {Button, Col, Modal, Row, Spin, Table} from "antd";

import {collection, injectMainStore, MainStoreInjected, Msg} from "@cuba-platform/react";
import {OrgStructureRequest} from "../../../cuba/entities/base/tsadv_OrgStructureRequest";
import {SerializedEntity} from "@cuba-platform/rest";
import {OrgStructureRequestManagement} from "./OrgStructureRequestManagement";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {restServices} from "../../../cuba/services";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import Column from "antd/es/table/Column";
import {PersonGroupExt} from "../../../cuba/entities/base/base$PersonGroupExt";
import {OrganizationGroupExt} from "../../../cuba/entities/base/base$OrganizationGroupExt";
import {DicCompany} from "../../../cuba/entities/base/base_DicCompany";
import {DicRequestStatus} from "../../../cuba/entities/base/tsadv$DicRequestStatus";
import {withRouter} from "react-router";

@injectMainStore
@inject("rootStore")
@observer
class OrgStructureRequestListComponent extends React.Component<MainStoreInjected & WrappedComponentProps & RouteComponentProps> {

  @observable selectedRowKey: string | undefined;

  dataCollection = collection<OrgStructureRequest>(
    OrgStructureRequest.NAME, {
      view: "orgStructureRequest-edit",
      sort: "requestNumber"
    }
  );

  fields = ["requestNumber", "requestDate", "company", "department", "author"];

  state = {
    rowId: null
  }

  preCreate = (e: React.MouseEvent) => {
    e.preventDefault();
    restServices.orgStructureService.initialCreate()
      .then(data => {
        this.props.history!.push(OrgStructureRequestManagement.PATH + "/" + data.id);
      });
  };

  setRowClassName = (record: OrgStructureRequest) => {
    return record.id === this.state.rowId ? 'ant-table-row-selected' : '';
  }

  render() {
    const buttons = [
      <Button
        htmlType="button"
        style={{margin: "0 12px 12px 0"}}
        type="primary"
        key="create"
        icon="plus"
        onClick={this.preCreate}>
          <span>
            <FormattedMessage id="management.browser.create"/>
          </span>
      </Button>,
      <Link
        to={OrgStructureRequestManagement.PATH + "/" + this.state.rowId}
        key="edit">
        <Button
          htmlType="button"
          style={{margin: "0 12px 12px 0"}}
          disabled={!this.state.rowId}
          type="default">
          <FormattedMessage id="management.browser.edit"/>
        </Button>
      </Link>,
      <Button
        htmlType="button"
        style={{margin: "0 12px 12px 0"}}
        disabled={!this.state.rowId}
        onClick={this.deleteSelectedRow}
        key="remove"
        type="default">
        <FormattedMessage id="management.browser.remove"/>
      </Button>
    ];

    return (
      <Page>
        <Section size={"large"}>
          <Spin spinning={this.dataCollection.status === 'LOADING'}>
            <Row style={{"margin": '10px 0'}}>
              <Col span={8}>
                {buttons}
              </Col>
            </Row>
            <Table dataSource={Array.from(this.dataCollection.items || '')}
                   pagination={false}
                   size="default" bordered={false} rowKey="id"
                   rowClassName={this.setRowClassName}
                   onRow={(record) => {
                     return {
                       onClick: () => {
                         this.setState({
                           rowId: record.id,
                         });
                       }
                     };
                   }}>
              <Column title={<Msg entityName={OrgStructureRequest.NAME} propertyName={"requestNumber"}/>}
                      dataIndex={"requestNumber"}
                      key={"requestNumber"}/>
              <Column title={<Msg entityName={OrgStructureRequest.NAME} propertyName={"requestDate"}/>}
                      dataIndex={"requestDate"}
                      key={"requestDate"}/>
              <Column title={<Msg entityName={OrgStructureRequest.NAME} propertyName={"requestStatus"}/>}
                      dataIndex={"requestStatus"}
                      key={"requestStatus"} render={(text, record: SerializedEntity<OrgStructureRequest>) => {
                return <span>{(record.requestStatus! as SerializedEntity<DicRequestStatus>)._instanceName}</span>
              }}/>
              <Column title={<Msg entityName={OrgStructureRequest.NAME} propertyName={"company"}/>}
                      dataIndex={"company"}
                      key={"company"} render={(text, record: SerializedEntity<OrgStructureRequest>) => {
                return <span>{(record.company! as SerializedEntity<DicCompany>)._instanceName}</span>
              }}/>
              <Column title={<Msg entityName={OrgStructureRequest.NAME} propertyName={"department"}/>}
                      dataIndex={"department"}
                      key={"department"} render={(text, record: SerializedEntity<OrgStructureRequest>) => {
                return <span>{(record.department! as SerializedEntity<OrganizationGroupExt>)._instanceName}</span>
              }}/>
              <Column title={<Msg entityName={OrgStructureRequest.NAME} propertyName={"author"}/>}
                      dataIndex={"author"}
                      key={"author"} render={(text, record: SerializedEntity<OrgStructureRequest>) => {
                return <span>{(record.author! as SerializedEntity<PersonGroupExt>)._instanceName}</span>
              }}/>
            </Table>
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

  deleteSelectedRow = () => {
    this.showDeletionDialog(this.getRecordById(this.state.rowId!));
  };
}

const OrgStructureRequestList = injectIntl(withRouter(OrgStructureRequestListComponent));

export default OrgStructureRequestList;
