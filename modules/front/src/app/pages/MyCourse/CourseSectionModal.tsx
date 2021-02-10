import React, {Component} from 'react';
import {Card, Icon, Modal} from "antd";
import {observer} from "mobx-react";
import {action, observable} from "mobx";
import {CourseSection} from "../../../cuba/entities/base/tsadv$CourseSection";
import Notification from "../../util/notification/Notification";
import Button, {ButtonType} from "../../components/Button/Button";
import Test, {AnsweredTest} from "../../components/Test/Test";
import Video from "../../components/Video";
import {queryInstance} from "../../util/QueryDataInstanceStore";
import {AssignedPerformancePlan} from "../../../cuba/entities/base/tsadv$AssignedPerformancePlan";
import {instance} from "@cuba-platform/react";
import {PersonExt} from "../../../cuba/entities/base/base$PersonExt";
import {restServices} from "../../../cuba/services";

type Props = {
  selectedCourseSection?: CourseSection,
  enrollmentId: string,
  onCloseModal?: () => void
  onFinishTest?: () => void
  onFinishSection?: () => void
}

@observer
class CourseSectionModal extends Component<Props> {

  @observable
  fullScreenModal: boolean = false;

  @action
  setFullScreenModal = (value: boolean) => {
    this.fullScreenModal = value;
  };

  render() {
    const isTest: boolean = this.props.selectedCourseSection ? this.props.selectedCourseSection.sectionObject!.test != undefined : false;

    return (<Modal visible={true}
                   onCancel={this.props.onCloseModal}
                   footer={null}
                   closable={!isTest}
                   maskClosable={!isTest}
                   width={900}
                   className={"course-section-modal" + (this.fullScreenModal ? " fullscreen" : "")}
                   destroyOnClose>
        {this.props.selectedCourseSection ? this.getSectionBody(this.props.selectedCourseSection) : null}
      </Modal>
    );
  }

  //TODO: переписать
  getSectionBody = (cs: CourseSection) => {
    if (!cs.sectionObject) {
      Notification.error({message: "У раздела отсутствует объект раздела!"});
      return;
    }

    if (cs.sectionObject.test) {
      return <Test test={{
        enrollmentId: this.props.enrollmentId,
        courseSectionObjectId: cs.sectionObject.id
      }} onFullScreenClick={this.setFullScreenModal.bind(null, !this.fullScreenModal)}
                   finishTimeHandler={this.props.onFinishSection}/>
    } else if (cs.sectionObject.content) {
      if (cs.sectionObject.content.contentType === "HTML") {
        return <Card className={"modal-body card-actions-container"}
                     actions={[<Button buttonType={ButtonType.PRIMARY} onClick={this.props.onFinishSection}>Завершить
                       раздел</Button>]}>
          <div className="fullscreen-icon">
            <Icon type="fullscreen" onClick={this.setFullScreenModal.bind(null, !this.fullScreenModal)}/>
          </div>
          <div dangerouslySetInnerHTML={{__html: cs.sectionObject.content.html!}}
               className="course-section-modal-body"/>
        </Card>
      }
      if (cs.sectionObject.content.contentType === "URL") {
        return <Card className={"modal-body card-actions-container"}
                     actions={[<Button buttonType={ButtonType.PRIMARY} onClick={this.props.onFinishSection}>Завершить
                       раздел</Button>]}>
          <div className="fullscreen-icon">
            <Icon type="fullscreen" onClick={this.setFullScreenModal.bind(null, !this.fullScreenModal)}/>
          </div>
          <div className="course-section-modal-body">
            <iframe width="100%" height="100%" src={cs.sectionObject.content.url!}/>
          </div>
        </Card>
      }
      if (cs.sectionObject.content.contentType === "VIDEO") {
        return <Card className={"modal-body card-actions-container"}
                     actions={[<Button buttonType={ButtonType.PRIMARY} onClick={this.props.onFinishSection}>Завершить
                       раздел</Button>]}>
          <div className="fullscreen-icon">
            <Icon type="fullscreen" onClick={this.setFullScreenModal.bind(null, !this.fullScreenModal)}/>
          </div>
          <div className="course-section-modal-body">
            <Video fileId={cs.sectionObject.content.file!.id!}/>
          </div>
        </Card>
      }
    }
    return null;
  };
}

export default CourseSectionModal;