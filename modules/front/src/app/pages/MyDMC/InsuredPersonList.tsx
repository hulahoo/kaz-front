import * as React from "react";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";

import {observable} from "mobx";

import {Button, Card, Modal} from "antd";

import {collection, DataTable, injectMainStore, MainStoreInjected} from "@cuba-platform/react";

import {InsuredPerson} from "../../../cuba/entities/base/tsadv$InsuredPerson";
import {SerializedEntity} from "@cuba-platform/rest";
import {InsuredPersonManagement} from "./InsuredPersonManagement";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {RootStoreProp} from "../../store";
import {RouteComponentProps} from "react-router";

@injectMainStore
@observer
@inject("rootStore")
class InsuredPersonListComponent extends React.Component<MainStoreInjected & WrappedComponentProps & RootStoreProp & RouteComponentProps<any>> {
  dataCollection = collection<InsuredPerson>(InsuredPerson.NAME, {
    view: "insuredPerson-browseView",
    sort: "-updateTs",
    filter: {
      conditions: [
        {
          property: "employee.id",
          operator: "=",
          value: this.props.rootStore!.userInfo.personGroupId!
        },
        {
          property: "type",
          operator: "=",
          value: "EMPLOYEE"
        }
      ]
    }
  });

  fields = [
    "documentNumber",
    "insuranceContract",
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

        return this.dataCollection.delete(e);
      }
    });
  };

  render() {
    const buttons = [
      <Button
        htmlType="button"
        style={{margin: "12px"}}
        type="primary"
        onClick={this.subscribeToMIC}
      >
        <span>
          Прикрепиться к ДМС
          </span>
      </Button>,
      <Button
        htmlType="button"
        style={{margin: "12px"}}
        type="primary"
        onClick={this.subscribeFamilyMemberToMIC}
      >
        <span>
          Прикрепить ЧС к ДМС
          </span>
      </Button>
    ];

    return (
      <Card style={{margin: "10px"}}>
        <DataTable
          dataCollection={this.dataCollection}
          fields={this.fields}
          onRowSelectionChange={this.handleRowSelectionChange}
          hideSelectionColumn={true}
          buttons={buttons}
        />
      </Card>
    );
  }

  getRecordById(id: string): SerializedEntity<InsuredPerson> {
    const record:
      | SerializedEntity<InsuredPerson>
      | undefined = this.dataCollection.items.find(record => record.id === id);

    if (!record) {
      throw new Error("Cannot find entity with id " + id);
    }

    return record;
  }

  handleRowSelectionChange = (selectedRowKeys: string[]) => {
    this.selectedRowKey = selectedRowKeys[0];
  };


  subscribeToMIC = () => {
    this.props.history.push(InsuredPersonManagement.PATH + "/" + InsuredPersonManagement.NEW_SUBPATH);
  };

  subscribeFamilyMemberToMIC = () => {
    console.log(this.dataCollection.items);
    let sort = this.dataCollection.items.sort((a, b) => a.exclusionDate.compareTo(b.exclusionDate));
    if (sort[0] === undefined) {
      console.log("error");
      return;
    }
    this.props.history.push(InsuredPersonManagement.PATH + "/" + sort[0].id);
  };


}

const InsuredPersonList = withRouter(injectIntl(InsuredPersonListComponent));

export default InsuredPersonList;
