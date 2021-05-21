import {getCubaREST, injectMainStore, MainStoreInjected, Msg} from "@cuba-platform/react";
import React, {createElement} from "react";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {observable} from "mobx";
import {StudentHomework} from "../../../../cuba/entities/base/tsadv_StudentHomework";
import {inject, observer} from "mobx-react";
import {RootStoreProp} from "../../../store";
import {Homework} from "../../../../cuba/entities/base/tsadv_Homework";
import {Card, Form, Tabs, Tag} from "antd";
import {downloadFile} from "../../../util/util";
import {FileDescriptor} from "../../../../cuba/entities/base/sys$FileDescriptor";
import TextArea from "antd/es/input/TextArea";

const {TabPane} = Tabs;

export type HomeworkProps = {
  courseId: string,
}

@injectMainStore
@inject("rootStore")
@observer
class LearningHistoryHomework extends React.Component<HomeworkProps & MainStoreInjected & WrappedComponentProps & RootStoreProp> {

  homeworks: Homework[] = [];
  @observable studentHomeworks: StudentHomework[] = [];

  render() {

    const pageName = this.props.intl.formatMessage({id: "homework"});

    return (
      <div>
        <Card className="narrow-layout card-actions-container">
          <Tabs tabPosition='top'>
            {
              this.studentHomeworks.sort((a, b) => {
                const aIndex = this.homeworks.indexOf(this.homeworks.find(value => value.id === a.homework!.id)!);
                const bIndex = this.homeworks.indexOf(this.homeworks.find(value => value.id === b.homework!.id)!);
                return aIndex - bIndex;
              }).map((studentHomework) => {
                const answerFile = studentHomework.answerFile;
                const index = this.homeworks.indexOf(this.homeworks.find(value => value.id === studentHomework.homework!.id)!);

                const file = studentHomework.homework!.instructionFile ?
                  <div className={"ant-row ant-form-item"} style={{marginBottom: "12px"}}>
                    {createElement(Msg, {entityName: Homework.NAME, propertyName: "instructionFile"})}
                    <Tag
                      style={{margin: "10px"}}
                      color={"blue"}
                      onClick={() => {
                        downloadFile((studentHomework.homework!.instructionFile as FileDescriptor).id,
                          (studentHomework.homework!.instructionFile as FileDescriptor).name as string,
                          (studentHomework.homework!.instructionFile as FileDescriptor).extension as string,
                          "");
                      }
                      }> {(studentHomework.homework!.instructionFile as FileDescriptor).name}</Tag>
                  </div> : <span/>;
                return <TabPane tab={pageName + " " + (1 + index)} key={"" + index}>
                  <div>
                    <Card className="narrow-layout">
                      <Form layout="vertical">
                        <div className={"ant-row ant-form-item"} style={{marginBottom: "12px"}}>
                          {createElement(Msg, {entityName: Homework.NAME, propertyName: "instructions"})}
                          <TextArea
                            disabled={true}
                            value={studentHomework.homework!.instructions!}
                            rows={4}/>
                        </div>
                        {file}

                        <div className={"ant-row ant-form-item"} style={{marginBottom: "12px"}}>
                          {createElement(Msg, {entityName: StudentHomework.NAME, propertyName: "answer"})}
                          <TextArea
                            value={studentHomework.answer || ''}
                            disabled={true}
                            rows={4}/>
                        </div>

                        {
                          answerFile
                            ? (<div className={"ant-row ant-form-item"} style={{marginBottom: "12px"}}>
                              <Tag style={{margin: "10px"}}
                                   color={"blue"}
                                   onClick={() => {
                                     downloadFile((answerFile as FileDescriptor).id,
                                       (answerFile as FileDescriptor).name as string,
                                       (answerFile as FileDescriptor).extension as string,
                                       "");
                                   }
                                   }> {(answerFile as FileDescriptor).name}</Tag>
                            </div>)
                            : null
                        }

                        <div className={"ant-row ant-form-item"} style={{marginBottom: "12px"}}>
                          {createElement(Msg, {entityName: StudentHomework.NAME, propertyName: "trainerComment"})}
                          <TextArea
                            value={studentHomework.trainerComment || ''}
                            disabled={true}
                            rows={4}/>
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
    );
  }

  componentDidMount() {
    getCubaREST()!.searchEntities<Homework>(Homework.NAME, {
      conditions: [{
        property: 'course.id',
        operator: '=',
        value: this.props.courseId
      }]
    }, {
      view: '_minimal'
    }).then(homeworks => {
      this.homeworks = homeworks;

      getCubaREST()!.searchEntities<StudentHomework>(StudentHomework.NAME, {
        conditions: [{
          property: 'homework.course.id',
          operator: '=',
          value: this.props.courseId
        }, {
          property: 'personGroup.id',
          operator: '=',
          value: this.props.rootStore!.userInfo!.personGroupId!
        }]
      }, {
        view: 'studentHomework.edit'
      }).then(value => this.studentHomeworks = value);
    });
  }
}

export default injectIntl(LearningHistoryHomework);