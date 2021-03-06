import * as React from "react";
import {inject, observer} from "mobx-react";
import {Link, withRouter} from "react-router-dom";

import {observable} from "mobx";

import {Button, Card, Spin} from "antd";

import {injectMainStore, MainStoreInjected, Msg} from "@cuba-platform/react";

import {InsuredPerson} from "../../../cuba/entities/base/tsadv$InsuredPerson";
import {InsuredPersonManagement} from "./InsuredPersonManagement";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {RootStoreProp} from "../../store";
import {RouteComponentProps} from "react-router";
import {Table} from "antd/es";
import Column from "antd/lib/table/Column";
import {DEFAULT_DATE_PARSE_FORMAT, restServices} from "../../../cuba/services";
import {InsuranceContract} from "../../../cuba/entities/base/tsadv$InsuranceContract";
import moment from "moment";
import {DEFAULT_DATE_PATTERN} from "../../util/Date/Date";

@injectMainStore
@observer
@inject("rootStore")
class InsuredPersonListComponent extends React.Component<MainStoreInjected & WrappedComponentProps & RootStoreProp & RouteComponentProps<any>> {
  // dataCollection = collection<InsuredPerson>(InsuredPerson.NAME, {
  //   view: "insuredPerson-browseView",
  //   sort: "-updateTs",
  //   filter: {
  //     conditions: [
  //       {
  //         property: "employee.id",
  //         operator: "=",
  //         value: this.props.rootStore!.userInfo.personGroupId!
  //       },
  //       {
  //         property: "type",
  //         operator: "=",
  //         value: "EMPLOYEE"
  //       }
  //     ]
  //   }
  // });

  @observable items: InsuredPerson[];

  fields = [
    "documentNumber",
    "insuranceContract",
    "attachDate",
    "statusRequest",
    "totalAmount",
  ];

  @observable selectedRowKey: string | undefined;


  render() {
    const buttons = [
      <Button
        htmlType="button"
        style={{margin: "12px"}}
        type="primary"
        key={'insurance'}
        onClick={this.subscribeToMIC}
      >
        <FormattedMessage id="join.health.insurance"/>
      </Button>,
      <Button
        htmlType="button"
        style={{margin: "12px"}}
        type="primary"
        key={'members'}
        onClick={this.subscribeFamilyMemberToMIC}
      >
        <FormattedMessage id="attach.family.members"/>
      </Button>
    ];

    return (
      <Card style={{margin: "10px"}}>
        <Spin spinning={this.items === undefined}>
          {buttons}
          <Table
            dataSource={this.items}
            rowKey={record => record.id}>
            <Column
              title={<Msg entityName={InsuranceContract.NAME} propertyName='contract'/>}
              dataIndex="insuranceContract.contract"
              render={(text, record: InsuredPerson) => (
                <Link to={InsuredPersonManagement.PATH + "/" + record.id}>{record.insuranceContract!.contract!}</Link>
              )}
            />

            <Column
              title={<Msg entityName={InsuranceContract.NAME} propertyName='startDate'/>}
              dataIndex="insuranceContract.startDate"
              render={(text, record: InsuredPerson) => (
                (React.createElement("div", null, moment(record.insuranceContract!.startDate!, DEFAULT_DATE_PARSE_FORMAT).format(DEFAULT_DATE_PATTERN)))
              )}
            />

            <Column
              title={<Msg entityName={InsuranceContract.NAME} propertyName='expirationDate'/>}
              dataIndex="insuranceContract.expirationDate"
              render={(text, record: InsuredPerson) => (
                (React.createElement("div", null, moment(record.insuranceContract!.expirationDate!, DEFAULT_DATE_PARSE_FORMAT).format(DEFAULT_DATE_PATTERN)))
              )}
            />

            <Column
              title={<Msg entityName={InsuredPerson.NAME} propertyName='attachDate'/>}
              dataIndex="attachDate"
              render={(text, record: InsuredPerson) => (
                (React.createElement("div", null, moment(record.attachDate!, DEFAULT_DATE_PARSE_FORMAT).format(DEFAULT_DATE_PATTERN)))
              )}
            />

            <Column
              title={<Msg entityName={InsuredPerson.NAME} propertyName='statusRequest'/>}
              dataIndex="statusRequest"
              render={(text, record: InsuredPerson) => (
                (React.createElement("div", null, record.statusRequest!.langValue!))
              )}
            />

            <Column
              title={<Msg entityName={InsuredPerson.NAME} propertyName='totalAmount'/>}
              dataIndex="totalAmount"
              render={(text, record: InsuredPerson) => (
                (React.createElement("div", null, record.totalAmount!))
              )}
            />

          </Table>
        </Spin>
      </Card>
    );
  }


  handleRowSelectionChange = (selectedRowKeys: string[]) => {
    this.selectedRowKey = selectedRowKeys[0];
  };


  subscribeToMIC = () => {
    this.props.history.push(InsuredPersonManagement.PATH + "/" + InsuredPersonManagement.NEW_SUBPATH);
  };

  subscribeFamilyMemberToMIC = () => {
    let sort = this.items.sort((a, b) => a.exclusionDate ? b.exclusionDate ? a.exclusionDate.compareTo(b.exclusionDate) : 1 : -1);
    if (sort[0] === undefined) {
      return;
    }
    this.props.history.push(InsuredPersonManagement.PATH + "/" + sort[0].id);
  };

  componentDidMount(): void {
    restServices.documentService.getMyInsuraces().then(val => {
      this.items = val;
      this.setState(this.items = val);
    })
  }
}

const InsuredPersonList = withRouter(injectIntl(InsuredPersonListComponent));

export default InsuredPersonList;
