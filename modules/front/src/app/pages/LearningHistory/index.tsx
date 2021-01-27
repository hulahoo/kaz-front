import React from 'react';
import {getCubaREST, injectMainStore, MainStoreInjected, Msg} from "@cuba-platform/react";
import {observable} from "mobx";
import {Table} from "antd";
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
import {CourseTrainer} from "../../../cuba/entities/base/tsadv$CourseTrainer";
import {Course} from "../../../cuba/entities/base/tsadv$Course";
import {restServices} from "../../../cuba/services";
import moment from "moment";

@inject("rootStore")
@injectMainStore
@observer
export class LearningHistory extends React.Component<MainStoreInjected & WrappedComponentProps & RootStoreProp> {

  @observable
  dataCollection: Course[] = [];

  fields = [
    "rowNumber",

    "period",

    "courseName",

    "trainerFullName",

    "testResult",

    "certificate"
  ];

  @observable selectedRowKey: string | undefined;

  previewCertificate = (fileId: string) => {
    getCubaREST()!.getFile(fileId).then(responseBlob => {
      window.open(URL.createObjectURL(responseBlob), "_blank");
    })
  };

  render() {
    return (
      <Page pageName={"История обучения"}>
        <Section visible={false} size={"large"}>
          <div className={"button-group"}>
            <Button buttonType={ButtonType.FOLLOW} className={"button-icon"}><ExcelSvg style={{width: '14px'}}/>Скачать
              в формате EXCEL</Button>
          </div>
          <Table dataSource={this.dataCollection.length > 0 ? this.dataCollection : []} pagination={false}
                 size="default" bordered={false} rowKey="id">
            <Column title={<>№</>}
                    dataIndex="rowNumber"
                    key="rowNumber" render={(text, record, index) => {
              return <span>{index + 1}</span>
            }}/>
            <Column title={<>Период</>}
                    dataIndex="period"
                    key="period" render={(text, record, index) => {
              return moment((record as Course).sections![0].session![0].startDate).format('DD.MM.yyyy') + ' - ' + moment((record as Course).sections![0].session![0].endDate).format('DD.MM.yyyy')
            }}/>
            <Column title={<Msg entityName={Enrollment.NAME} propertyName='course'/>}
                    dataIndex="course"
                    key="course" render={(text, record) => {
              return (record as Course).name!
            }}/>
            <Column title={<Msg entityName={CourseTrainer.NAME} propertyName='trainer'/>}
                    dataIndex="trainer"
                    key="trainer" render={(text, record) => {
              return (record as Course).sections!.map(s => s.session!.filter(ss => ss.trainer != undefined).map(ss => ss.trainer!.trainerFullName).join(', '));
            }}/>
            <Column title={<>Результат теста</>}
                    dataIndex="test"
                    key="test" render={(text, record) => {
              return (record as Course).sections!.map(s => s.session!.filter(ss => ss.trainer != undefined).map(ss => ss.trainer!.trainerFullName).join(', '));
            }}/>
            <Column
              title={<>Сертификат</>}
              key="action"
              render={ag => (
                <a style={{padding: 0}} onClick={() => this.previewCertificate("c25098eb-a310-a1e6-b775-b44e5ee13fe2")}>
                Просмотр
                </a>
                )}
            />
          </Table>
        </Section>
      </Page>
    );
  }

  componentDidMount(): void {
    // restServices.learningService.learningHistory({personGroupId: this.props.rootStore!.userInfo.personGroupId!}).then((c) => {
    restServices.learningService.learningHistory({personGroupId: "47ecc3eb-cbef-c40e-eab2-32c45d6da880"}).then((c) => {
      this.dataCollection = c
    })
  }

  handleRowSelectionChange = (selectedRowKeys: string[]) => {
    this.selectedRowKey = selectedRowKeys[0];
  };
}

export default injectIntl(LearningHistory);