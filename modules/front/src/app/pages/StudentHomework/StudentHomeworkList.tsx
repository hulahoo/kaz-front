import * as React from "react";
import {createElement} from "react";
import {inject, observer} from "mobx-react";

import {observable, toJS} from "mobx";

import {Card, Form, Tabs, Tag} from "antd";

import {FileUpload, getCubaREST, injectMainStore, MainStoreInjected, Msg} from "@cuba-platform/react";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {Homework} from "../../../cuba/entities/base/tsadv_Homework";
import {restQueries} from "../../../cuba/queries";
import {RootStoreProp} from "../../store";
import {RouteComponentProps} from "react-router-dom";
import Page from "../../hoc/PageContentHoc";
import Section from "../../hoc/Section";
import Button, {ButtonType} from "../../components/Button/Button";
import LoadingPage from "../LoadingPage";
import {withRouter} from "react-router";
import {StudentHomework} from "../../../cuba/entities/base/tsadv_StudentHomework";
import TextArea from "antd/es/input/TextArea";
import {downloadFile} from "../../util/util";
import {FileDescriptor} from "../../../cuba/entities/base/sys$FileDescriptor";
import Notification from "../../util/Notification/Notification";

const {TabPane} = Tabs;

type Props = {
  enrollmentId: string,
}

@inject("rootStore")
@injectMainStore
@observer
class StudentHomeworkListComponent extends React.Component<Props & MainStoreInjected & WrappedComponentProps & RootStoreProp & RouteComponentProps<any>> {

  @observable courseId: string;

  @observable homeworks: Homework[];

  @observable studentHomework = new StudentHomework();

  isStudentHomeworkChanged = false

  newFileId: string | undefined | null;

  @observable selectedRowKey: string | undefined;

  @observable defaultActiveKey = -1;

  @observable answer = "";

  save = () => {
    this.studentHomework.personGroup = {id: this.props.rootStore!.userInfo.personGroupId!};
    if (this.newFileId !== undefined && this.newFileId !== null) this.studentHomework.answerFile = {id: this.newFileId};
    else if (this.newFileId === null) this.studentHomework.answerFile = null;

    this.studentHomework.answer = this.answer;

    getCubaREST()!.commitEntity(StudentHomework.NAME, toJS(this.studentHomework))
      .then(value => {
        this.isStudentHomeworkChanged = false;
        Notification.success({message: this.props.intl.formatMessage({id: "management.editor.success"})});
      })
      .catch((e: any) => {
        Notification.error({
          message: this.props.intl.formatMessage({id: "management.editor.error"})
        });
      });
  }

  onChangeTab = (increment: number) => {
    if (this.isStudentHomeworkChanged && this.defaultActiveKey >= 0) this.save();

    this.defaultActiveKey = increment + this.defaultActiveKey
    if (!this.homeworks || this.defaultActiveKey >= this.homeworks.length || this.defaultActiveKey < 0) return;
    const homework = this.homeworks[this.defaultActiveKey];
    restQueries.studentHomework(homework.id, this.props.rootStore!.userInfo.personGroupId!)
      .then(value => {
        if (value.length > 0) {
          this.studentHomework = value[0];
        } else {
          const studentHomework = new StudentHomework();
          studentHomework.homework = homework;
          this.studentHomework = studentHomework
        }
        this.answer = this.studentHomework.answer ? this.studentHomework.answer : "";
        this.isStudentHomeworkChanged = false;
        this.newFileId = undefined;
      });
  }

  getActions = () => {
    const arr = new Array<any>();
    if (this.defaultActiveKey >= 1) {
      arr.push(<Button buttonType={ButtonType.FOLLOW}
                       onClick={() => this.onChangeTab(-1)}>
        {this.props.intl.formatMessage({id: "previous"})}
      </Button>);
    }

    if (this.homeworks !== null && this.defaultActiveKey < this.homeworks.length - 1) {
      arr.push(<Button buttonType={ButtonType.FOLLOW}
                       onClick={() => this.onChangeTab(1)}>
        {this.props.intl.formatMessage({id: "next"})}
      </Button>);
    }
    arr.push(<Button buttonType={ButtonType.FOLLOW}
                     onClick={this.save}>
      <FormattedMessage id="management.editor.submit"/>
    </Button>);
    arr.push(<Button buttonType={ButtonType.FOLLOW}
                     disabled={false}
                     onClick={this.props.history!.goBack}>
      {this.props.intl.formatMessage({id: "close"})}
    </Button>);
    return arr;
  }

  render() {
    if (!this.homeworks || this.homeworks.length < 1) {
      return <LoadingPage/>;
    }

    const fileInfo = this.studentHomework && this.studentHomework.answerFile ? {
      id: this.studentHomework.answerFile!.id!,
      name: this.studentHomework.answerFile!.name!
    } : undefined;

    const pageName = this.props.intl.formatMessage({id: "homework"});
    return (
      <Page pageName={pageName}>
        <Section size="large">
          <div>
            <Card className="narrow-layout card-actions-container" actions={this.getActions()}>
              <Tabs tabPosition='top'
                    onChange={activeKey => {
                      if ("" + this.defaultActiveKey !== activeKey)
                        this.onChangeTab(parseInt(activeKey) - this.defaultActiveKey)
                    }}
                    activeKey={"" + this.defaultActiveKey}>
                {
                  this.homeworks.map((record, index) => {
                    const file = record.instructionFile ?
                      <div className={"ant-row ant-form-item"} style={{marginBottom: "12px"}}>
                        {createElement(Msg, {entityName: Homework.NAME, propertyName: "instructionFile"})}
                        <Tag
                          style={{margin: "10px"}}
                          color={"blue"}
                          onClick={() => {
                            downloadFile((record.instructionFile as FileDescriptor).id,
                              (record.instructionFile as FileDescriptor).name as string,
                              (record.instructionFile as FileDescriptor).extension as string,
                              "");
                          }
                          }> {(record.instructionFile as FileDescriptor).name}</Tag>
                      </div> : <span/>;
                    return <TabPane tab={pageName + " " + (1 + index)} key={"" + index}>
                      <div>
                        <Card className="narrow-layout">
                          <Form layout="vertical">
                            <div className={"ant-row ant-form-item"} style={{marginBottom: "12px"}}>
                              {createElement(Msg, {entityName: Homework.NAME, propertyName: "instructions"})}
                              <TextArea
                                disabled={true}
                                value={record.instructions!}
                                rows={4}/>
                            </div>
                            {file}

                            <div className={"ant-row ant-form-item"} style={{marginBottom: "12px"}}>
                              {createElement(Msg, {entityName: StudentHomework.NAME, propertyName: "answer"})}
                              <TextArea
                                value={this.answer}
                                onChange={event => {
                                  this.answer = event.currentTarget.value;
                                  this.isStudentHomeworkChanged = true;
                                }}
                                rows={4}/>
                            </div>

                            <div className={"ant-row ant-form-item"} style={{marginBottom: "12px"}}>
                              {/*{createElement(Msg, {entityName: StudentHomework.NAME, propertyName: "answerFile"})}*/}
                              <FileUpload value={fileInfo} onChange={arg => {
                                this.newFileId = arg === null ? null : arg.id;
                                this.isStudentHomeworkChanged = true;
                              }}/>
                            </div>
                          </Form>
                        </Card>
                      </div>
                    </TabPane>
                  })
                }
              </Tabs>
            </Card>
          </div>
        </Section>
      </Page>
    );
  }

  componentDidMount() {
    restQueries.homeworksByEnrollment(this.props.enrollmentId).then(value => {
      this.homeworks = value;
      this.onChangeTab(1);
    });
  }
}

const StudentHomeworkList = withRouter(injectIntl(StudentHomeworkListComponent));

export default StudentHomeworkList;
