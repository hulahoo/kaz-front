import React from 'react';
import {getCubaREST, injectMainStore, MainStoreInjected, Msg} from "@cuba-platform/react";
import {observable} from "mobx";
import { Spin, Table} from "antd";
import Column from "antd/es/table/Column";
import { injectIntl, WrappedComponentProps} from "react-intl";
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



interface iDataItem {
  certificate?: any|null;
  course? : string|null;
  courseId?: string|null;
  endDate?:  Date|null;
  enrollmentId?: string|null;
  enrollmentStatus?: string|null;
  note?: string|null;
  result?: number|null;
  startDate?: Date|null;
  trainer?: string[]|null;

}
interface iDataItems extends Array<iDataItem>{};
@injectMainStore
@inject("rootStore")
@observer
class LearningHistory extends React.Component<MainStoreInjected & WrappedComponentProps & RootStoreProp & RouteComponentProps> {

  @observable
  dataCollection: iDataItems = [];
  state = {
    isLoading: true
  }
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
          <Spin spinning={this.state.isLoading}>
            <Table dataSource={this.dataCollection.length > 0 ? this.dataCollection : []} pagination={false}
                   size="default" bordered={false} rowKey="id" >
              <Column title={<>№</>}
                      dataIndex="rowNumber"

                      key="rowNumber" render={(text, record, index) => {
                return <span>{index + 1}</span>
              }}/>
              <Column title={<>{this.props.intl.formatMessage({id: "learning.period"})}</>}
                      dataIndex="period"
                      sorter={(a:iDataItem, b:iDataItem) => moment(a.endDate).unix() - moment(b.endDate).unix()}
                      key="period" render={(text, record: any) => {
                return (record.startDate ? moment(record.startDate).format('DD.MM.yyyy') : "")+
                  (record.endDate && (record.enrollmentStatus==="Completed"|| record.enrollmentStatus==="Утверждено") ? "\n - \n"+ moment(record.endDate).format('DD.MM.yyyy') : "")
              }}/>
              <Column title={<Msg entityName={Enrollment.NAME} propertyName='course'/>}
                      dataIndex="course"
                      width="200px"
                      sorter={(a : iDataItem, b:iDataItem) =>a.course!.localeCompare(b.course!) }
                      key="course" render={(text, record: any) => {
                return <Link to={CourseManagement.PATH + '/' + record.courseId}>{record.course}</Link>
              }}/>
              <Column title={<>{this.props.intl.formatMessage({id: 'diary'})}</>}
                      dataIndex="note"
                      key="note"
                      width="100px"
                      sorter={true}
                      render={(text, record: any) => <LearningHistoryDiary record={record}/>}/>
              <Column title={<Msg entityName={Enrollment.NAME} propertyName='status'/>}
                      dataIndex="enrollmentStatus"
                      sorter={(a:iDataItem, b:iDataItem) =>a.enrollmentStatus!.length - b.enrollmentStatus!.length}
                      key="enrollmentStatus"/>
              <Column title={<Msg entityName={CourseTrainer.NAME} propertyName='trainer'/>}
                      dataIndex="trainer"
                      sorter={(a:iDataItem, b:iDataItem) => a.trainer!.length - b.trainer!.length}
                      key="trainer" render={(text, record: any) => {
                return record.trainer;
              }}/>
              <Column title={<>{this.props.intl.formatMessage({id: "learningHistory.testResult"})}</>}
                      dataIndex="test"
                      sorter={(a:iDataItem, b:iDataItem) => Number(a.result!) - Number(b.result!)}
                      key="test" render={(text, record: any) => {
                return (record.result ? record.result + '%' : '');
              }}/>
              <Column
                title={<>{this.props.intl.formatMessage({id: "learningHistory.certificate"})}</>}
                key="action"
                sorter={true}
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
          </Spin>
        </Section>
      </Page>
    );
  }

  componentDidMount(): void {
    restServices.learningService.learningHistory({personGroupId: this.props.rootStore!.userInfo.personGroupId!})
      .then((c) => {
        this.dataCollection = c
        this.setState({
          isLoading: false
        })
      })

  }
}

export default withRouter(injectIntl(LearningHistory));
