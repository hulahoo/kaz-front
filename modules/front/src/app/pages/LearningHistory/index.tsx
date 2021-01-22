import React from 'react';
import {collection, injectMainStore, MainStoreInjected, Msg} from "@cuba-platform/react";
import {AssignedGoal} from "../../../cuba/entities/base/tsadv$AssignedGoal";
import {observable} from "mobx";
import {SerializedEntity} from "@cuba-platform/rest";
import {Icon, Table} from "antd";
import Column from "antd/es/table/Column";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {inject, observer} from "mobx-react";
import {RootStoreProp} from "../../store";
import {Enrollment} from "../../../cuba/entities/base/tsadv$Enrollment";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import Button, {ButtonType} from "../../components/Button/Button";
import {Link} from "react-router-dom";
import {ReactComponent as ExcelSvg} from '../../../resources/icons/excel.svg';

@inject("rootStore")
@injectMainStore
@observer
export class LearningHistory extends React.Component<MainStoreInjected & WrappedComponentProps & RootStoreProp> {

  dataCollection = collection<Enrollment>(Enrollment.NAME, {
    view: "enrollment-learning-history",
    filter: {
      conditions: [{
        property: "personGroup.id",
        operator: "=",
        // value: this.props.rootStore!.userInfo.personGroupId!
        value: "47ecc3eb-cbef-c40e-eab2-32c45d6da880"
      }]
    },
    sort: "-date"
  });

  fields = [
    "rowNumber",

    "period",

    "courseName",

    "trainerFullName",

    "testResult",

    "certificate"
  ];

  @observable selectedRowKey: string | undefined;

  render() {
    return (
      <Page pageName={"История обучения"}>
        <Section visible={false} size={"large"}>
          <div className={"button-group"}>
            <Button buttonType={ButtonType.FOLLOW} className={"button-icon"}><ExcelSvg style={{width: '14px'}}/>Скачать в формате EXCEL</Button>
            <Button buttonType={ButtonType.FOLLOW}>Скачать все сертификаты</Button>
          </div>
          <Table dataSource={this.dataCollection.items.length > 0 ? this.dataCollection.items : []} pagination={false}
                 size="default" bordered={false} rowKey="id">
            <Column title={<Msg entityName={AssignedGoal.NAME} propertyName='rowNumber'/>}
                    dataIndex="rowNumber"
                    key="rowNumber" render={(text, record, index) => {
              return <span>{index + 1}</span>
            }}/>
            <Column title={<Msg entityName={AssignedGoal.NAME} propertyName='category'/>}
                    dataIndex="category"
                    key="period" render={(text, record, index) => {
              return (record as Enrollment).course!.category!.langValue1
            }}/>
            <Column
              title=""
              key="action"
              render={ag => (
                <Link type="link"
                      style={{padding: 0}} to={"/"}>
                  Скачать формат Excel
                </Link>
              )}
            />
          </Table>
        </Section>
      </Page>
    );
  }

  getRecordById(id: string): SerializedEntity<AssignedGoal> {
    const record:
      | SerializedEntity<AssignedGoal>
      | undefined = this.dataCollection.items.find(record => record.id === id);

    if (!record) {
      throw new Error("Cannot find entity with id " + id);
    }

    return record;
  }

  handleRowSelectionChange = (selectedRowKeys: string[]) => {
    this.selectedRowKey = selectedRowKeys[0];
  };
}

export default injectIntl(LearningHistory);