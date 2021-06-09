import {getCubaREST, injectMainStore, MainStoreInjected} from "@cuba-platform/react";
import {inject, observer} from "mobx-react";
import React from "react";
import {FormattedMessage, injectIntl, WrappedComponentProps} from "react-intl";
import {RootStoreProp} from "../../../store";
import {RouteComponentProps, withRouter} from "react-router";
import {Button, Modal} from "antd";
import {observable} from "mobx";
import {getResource} from "../../../../resources";
import {ReactComponent as SvgNode} from "../../../../resources/icons/learningHistory/comment-alt-regular.svg";
import {ReactComponent as SvgHomework} from "../../../../resources/icons/learningHistory/tasks-solid.svg";
import {ReactComponent as SvgTeacher} from "../../../../resources/icons/learningHistory/chalkboard-teacher-solid.svg";
import Homework from "../LearningHistoryHomework";
import {StudentHomework} from "../../../../cuba/entities/base/tsadv_StudentHomework";
import LearningHistoryScormResult from "../LearningHistoryScormResult";
import {CourseSectionScormResult} from "../../../../cuba/entities/base/tsadv_CourseSectionScormResult";

export type LearningHistoryDiaryProps = {
  record: any
}

@injectMainStore
@inject("rootStore")
@observer
class LearningHistoryDiary extends React.Component<LearningHistoryDiaryProps & MainStoreInjected & WrappedComponentProps & RootStoreProp & RouteComponentProps> {

  @observable
  visible: boolean = false;

  @observable hasHomework: boolean = false;
  @observable hasCourseRecording: boolean = false;
  @observable isModalVisible: boolean = false;
  @observable noteValue: string = this.props.record.note || '';
  @observable type: 'note' | 'homework' | 'Course recordings';

  render() {

    const amount = 1 + (this.hasHomework ? 1 : 0) + (this.hasCourseRecording ? 1 : 0);

    return (
      <div>
        <Button type={"link"} onClickCapture={() => this.visible = true}>
          <img src={getResource('book-solid.svg', 'icons/learningHistory')} height={30} alt={'dnevnik'}/>
        </Button>
        <Modal
          width={(160 * amount + 50)}
          // maskStyle={{width: (150 * amount + 50) + 'px'}}
          visible={this.visible}
          onCancel={() => this.visible = false}
          footer={[]}
        >
          <div style={{display: 'inline-block', width: '150px', textAlign: 'center'}}>
            <SvgNode
              width="100px"
              onClick={() => {
                this.type = 'note';
                this.isModalVisible = true;
              }}
              style={{
                color: '#005487',
                cursor: 'pointer',
                padding: '20px',
              }}
            />
            <div style={{textAlign: 'center'}}>
              <FormattedMessage id={"notes"}/>
            </div>
          </div>

          {
            this.hasHomework ?
              (<div style={{display: 'inline-block', width: '150px', textAlign: 'center'}}>
                <SvgHomework
                  width="100px"
                  onClick={() => {
                    this.type = 'homework';
                    this.isModalVisible = true;
                  }}
                  style={{
                    color: '#005487',
                    cursor: 'pointer',
                    padding: '20px',
                  }}
                />
                <div style={{textAlign: 'center'}}>
                  <FormattedMessage id={"homework"}/>
                </div>
              </div>)
              : null
          }

          {
            this.hasCourseRecording
              ? (<div style={{display: 'inline-block', width: '150px', textAlign: 'center'}}>
                <SvgTeacher
                  width="100px"
                  onClick={() => {
                    this.type = 'Course recordings';
                    this.isModalVisible = true;
                  }}
                  style={{
                    color: '#005487',
                    cursor: 'pointer',
                    padding: '20px',
                  }}
                />
                <div style={{display: 'flex', placeContent: 'center'}}>
                  <FormattedMessage id={"course.Recordings"}/>
                </div>
              </div>)
              : null
          }
        </Modal>

        <Modal visible={this.isModalVisible}
               okText={<FormattedMessage id={this.type === 'note' ? 'download' : 'cubaReact.dataTable.ok'}/>}
               cancelButtonProps={this.type !== 'note' ? {style: {display: 'none'}} : {}}
               bodyStyle={{height: '600px', overflow: 'auto'}}
               onOk={() => {
                 if (this.type === 'note') {
                   const element = document.createElement("a");
                   const file = new Blob([this.noteValue], {type: 'text/plain'});
                   element.href = URL.createObjectURL(file);
                   element.download = "note.txt";
                   document.body.appendChild(element);
                   element.click();
                 } else {
                   this.isModalVisible = false
                 }
               }}
               closable={false}
               onCancel={() => this.isModalVisible = false}>
          {this.renderDiary(this.type)}
        </Modal>
      </div>
    );
  }

  renderDiary = (type: 'note' | 'homework' | 'Course recordings') => {
    switch (type) {
      case "note":
        return <textarea value={this.noteValue} style={{width: '100%', height: '100%'}} disabled={true}/>;
      case "homework":
        return <Homework courseId={this.props.record.courseId}/>;
      case "Course recordings":
        return <LearningHistoryScormResult enrollmentId={this.props.record.enrollmentId}/>
    }
    return <></>;
  }

  componentDidMount() {

    getCubaREST()!.searchEntitiesWithCount<StudentHomework>(StudentHomework.NAME, {
      conditions: [{
        property: 'homework.course.id',
        operator: '=',
        value: this.props.record.courseId
      }, {
        property: 'personGroup.id',
        operator: '=',
        value: this.props.rootStore!.userInfo!.personGroupId!
      }]
    }, {
      view: 'studentHomework.edit'
    }).then(value => this.hasHomework = value.count > 0);

    getCubaREST()!.searchEntitiesWithCount<CourseSectionScormResult>(CourseSectionScormResult.NAME, {
      conditions: [{
        property: 'courseSectionAttempt.enrollment.id',
        operator: '=',
        value: this.props.record.enrollmentId
      }]
    }, {
      view: '_local'
    }).then(scormResult => {
      this.hasCourseRecording = scormResult.count > 0;
    });
  }

}

export default withRouter(injectIntl(LearningHistoryDiary));