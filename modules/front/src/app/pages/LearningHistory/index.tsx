import React from 'react';
import {getCubaREST, injectMainStore, MainStoreInjected, Msg} from "@cuba-platform/react";
import {observable} from "mobx";
import {Modal, Table} from "antd";
import Column from "antd/es/table/Column";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {inject, observer} from "mobx-react";
import {RootStoreProp} from "../../store";
import {Enrollment} from "../../../cuba/entities/base/tsadv$Enrollment";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import {CourseTrainer} from "../../../cuba/entities/base/tsadv$CourseTrainer";
import {restServices} from "../../../cuba/services";
import moment from "moment";
import {RouteComponentProps, withRouter} from "react-router";
import {Link} from "react-router-dom";
import {CourseManagement} from "../Course/CourseManagement";
import LearningHistoryDiary from "./LearningHistoryDiary";

@injectMainStore
@inject("rootStore")
@observer
class LearningHistory extends React.Component<MainStoreInjected & WrappedComponentProps & RootStoreProp & RouteComponentProps> {

  @observable
  dataCollection: any[] = [];

  fields = [
    "rowNumber",

    "period",

    "courseName",

    "enrollmentStatus",

    "trainerFullName",

    "testResult",

    "certificate"
  ];

  previewCertificate = (fileId: string) => {
    getCubaREST()!.getFile(fileId).then(responseBlob => {
      window.open(URL.createObjectURL(responseBlob), "_blank");
    })
  };

  render() {
    return (
      <Page pageName={this.props.intl.formatMessage({id: "menu.learn-history"})}>
        <Section visible={false} size={"large"}>
          <Table dataSource={this.dataCollection.length > 0 ? this.dataCollection : []} pagination={false}
                 size="default" bordered={false} rowKey="id">
            <Column title={<>№</>}
                    dataIndex="rowNumber"
                    key="rowNumber" render={(text, record, index) => {
              return <span>{index + 1}</span>
            }}/>
            <Column title={<>{this.props.intl.formatMessage({id: "learning.period"})}</>}
                    dataIndex="period"
                    key="period" render={(text, record: any, index) => {
              return (record.startDate ? moment(record.startDate).format('DD.MM.yyyy') : "")
                + ' - ' +
                (record.endDate ? moment(record.endDate).format('DD.MM.yyyy') : "")
            }}/>
            <Column title={<Msg entityName={Enrollment.NAME} propertyName='course'/>}
                    dataIndex="course"
                    width="200px"
                    key="course" render={(text, record: any) => {
              return <Link to={CourseManagement.PATH + '/' + record.courseId}>{record.course}</Link>
            }}/>
            <Column title={<>{this.props.intl.formatMessage({id: 'diary'})}</>}
                    dataIndex="note"
                    key="note"
                    width="100px"
                    render={(text, record: any) => <LearningHistoryDiary record={record}/>}/>
            <Column title={<Msg entityName={Enrollment.NAME} propertyName='status'/>}
                    dataIndex="enrollmentStatus"
                    key="enrollmentStatus"/>
            <Column title={<Msg entityName={CourseTrainer.NAME} propertyName='trainer'/>}
                    dataIndex="trainer"
                    key="trainer" render={(text, record: any) => {
              return record.trainer;
            }}/>
            <Column title={<>{this.props.intl.formatMessage({id: "learningHistory.testResult"})}</>}
                    dataIndex="test"
                    key="test" render={(text, record: any) => {
              return (record.result ? record.result + '%' : '');
            }}/>
            <Column
              title={<>{this.props.intl.formatMessage({id: "learningHistory.certificate"})}</>}
              key="action"
              render={(text, record: any) => {
                if (!record.certificate) return null;
                return (
                  <a style={{padding: 0}} onClick={() => this.previewCertificate(record.certificate)}>
                    {this.props.intl.formatMessage({id: "learningHistory.overview"})}
                  </a>
                )
              }}
            />
          </Table>
        </Section>
      </Page>
    );
  }

  componentDidMount(): void {
    restServices.learningService.learningHistory({personGroupId: this.props.rootStore!.userInfo.personGroupId!})
      .then((c) => {
        this.dataCollection = c
      })
  }
}

export default withRouter(injectIntl(LearningHistory));
