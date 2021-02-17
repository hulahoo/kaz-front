import * as React from "react";
import {observer} from "mobx-react";
import {Link} from "react-router-dom";

import {observable, reaction, runInAction} from "mobx";

import {Button, Modal, Table} from "antd";

import {collection, injectMainStore, MainStoreInjected, Msg} from "@cuba-platform/react";

import {InsuredPerson} from "../../../cuba/entities/base/tsadv$InsuredPerson";
import {EntityFilter, SerializedEntity} from "@cuba-platform/rest";
import {InsuredPersonManagement} from "./InsuredPersonManagement";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import Column from "antd/es/table/Column";
import {AssignedGoal} from "../../../cuba/entities/base/tsadv$AssignedGoal";
import {restQueries} from "../../../cuba/queries";
import {RouteComponentProps, withRouter} from "react-router";
import {RootStoreProp} from "../../store";


@injectMainStore
@observer
class InsuredPersonListComponent extends React.Component<MainStoreInjected & WrappedComponentProps & RootStoreProp & RouteComponentProps> {

  @observable
  dataCollection: any[] = [];

  serverDataCollection = collection<InsuredPerson>(InsuredPerson.NAME, {
    view: "insuredPerson-browseView",
    sort: "-updateTs",
    filter: {
      conditions:[{
        property: "employee.id",
        operator: "=",
        value: this.props.rootStore!.userInfo.personGroupId!
      },{
        property: "type",
        operator: "=",
        value: "Employee",
      },]
    }
  });

  fields = [
    "insuranceContract.contract",
    "insuranceContract.startDate",
    "insuranceContract.expirationDate",
    "attachDate",
    "statusRequest",
    "totalAmount",
  ];

  @observable selectedRowKey: string | undefined;

  showDeletionDialog = (e: SerializedEntity<InsuredPerson>) => {
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

        return this.serverDataCollection.delete(e);
      }
    });
  };

  render() {
    const buttons = [
      <Link
        to={
          InsuredPersonManagement.PATH +
          "/" +
          InsuredPersonManagement.NEW_SUBPATH
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
        to={InsuredPersonManagement.PATH + "/" + this.selectedRowKey}
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
      <Table dataSource={this.dataCollection.length > 0 ? this.dataCollection.slice() : []} pagination={false}
             size="default" bordered={false} rowKey="id">
        <Column title={<Msg entityName={InsuredPerson.NAME} propertyName='insuranceContract'/>}
                dataIndex="insuranceContract.contract"
                key="insuranceContract"
                sorter={(a: InsuredPerson, b: InsuredPerson) =>
                  a.insuranceContract!.contract!.localeCompare(b.insuranceContract!.contract!)
                }/>

        <Column title={<Msg entityName={InsuredPerson.NAME} propertyName='insuranceContract'/>}
                dataIndex="insuranceContract.startDate"
                key="startDate"
                sorter={(a: InsuredPerson, b: InsuredPerson) =>
                  a.insuranceContract!.startDate!.localeCompare(b.insuranceContract!.startDate!)
                }/>

        <Column title={<Msg entityName={InsuredPerson.NAME} propertyName='insuranceContract'/>}
                dataIndex="insuranceContract.expirationDate"
                key="expirationDate"
                sorter={(a: InsuredPerson, b: InsuredPerson) =>
                  a.insuranceContract!.expirationDate!.localeCompare(b.insuranceContract!.expirationDate!)
                }/>


        <Column title={<Msg entityName={InsuredPerson.NAME} propertyName='attachDate'/>}
                dataIndex="attachDate"
                key="attachDate"
                sorter={(a: InsuredPerson, b: InsuredPerson) =>
                  a.attachDate!.localeCompare(b.attachDate!)
                }/>

        <Column title={<Msg entityName={InsuredPerson.NAME} propertyName='statusRequest'/>}
                dataIndex="statusRequest"
                key="statusRequest"
                sorter={(a: InsuredPerson, b: InsuredPerson) =>
                  a.statusRequest!.langValue!.localeCompare(b.statusRequest!.langValue!)
                }/>

        <Column title={<Msg entityName={InsuredPerson.NAME} propertyName='totalAmount'/>}
                dataIndex="totalAmount"
                key="totalAmount"
                sorter={(a: InsuredPerson, b: InsuredPerson) =>
                  a.totalAmount!.localeCompare(b.totalAmount!)
                }/>

      </Table>
    );
  }

  getRecordById(id: string): SerializedEntity<InsuredPerson> {
    const record:
      | SerializedEntity<InsuredPerson>
      | undefined = this.serverDataCollection.items.find(record => record.id === id);

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

export default injectIntl(withRouter(InsuredPersonListComponent));

