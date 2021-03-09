import React, {Component} from 'react';
import {Modal, Spin} from "antd";
import {observer} from "mobx-react";
import {CourseSection} from "../../../cuba/entities/base/tsadv$CourseSection";
import RenderModalBodyImpl, {RenderModalBody} from "./RenderModalBody/RenderModalBody";
import {restServices} from "../../../cuba/services";
import {action, observable} from "mobx";
import {SelectedSection} from "./EnrollmentEdit";
import {DataInstanceStore, instance} from "@cuba-platform/react";
import {FeedbackCourse} from "./RenderModalBody/Feedback/FeedbackComponent";
import {LearningFeedbackQuestion} from "../../../cuba/entities/base/tsadv$LearningFeedbackQuestion";
import {SerializedEntity} from "@cuba-platform/rest";

type Props = {
  courseId: string,
  selectedSection: SelectedSection
  enrollmentId: string,
  onCloseModal?: () => void
  onFinishTest?: () => void
  onFinishSection?: () => void
}

@observer
class CourseSectionModal extends Component<Props> {

  @observable
  sectionData: DataInstanceStore<CourseSection> | LearningFeedbackQuestion[];

  @observable
  fullScreenModal: boolean = false;

  @action
  setFullScreenModal = (value: boolean) => {
    this.fullScreenModal = value;
  };

  render() {
    const loading = (this.sectionData
      ? this.props.selectedSection.type === "feedback"
        ? ((this.sectionData as LearningFeedbackQuestion[]) == undefined)
        : (this.sectionData as DataInstanceStore<CourseSection>).status != "DONE"
      : true);

    return (<Modal visible={true}
                   onCancel={this.props.onCloseModal}
                   footer={null}
                   closable={!this.isTest(loading)}
                   maskClosable={!this.isTest(loading)}
                   width={900}
                   className={"course-section-modal" + (this.fullScreenModal ? " fullscreen" : "")}
                   destroyOnClose>
        {!loading ? this.getSectionBody() : null}
      </Modal>
    );
  }

  isTest = (loading: boolean): boolean => {
    return !loading ? this.props.selectedSection.type === "course-section" && (this.sectionData as DataInstanceStore<CourseSection>).item!.sectionObject ? (this.sectionData as DataInstanceStore<CourseSection>).item!.sectionObject!.test != undefined : false : false;
  };

  getSectionBody = () => {
    const params = ((this.sectionData as DataInstanceStore<CourseSection>).item ? {
      courseId: this.props.courseId,
      courseSection: ((this.sectionData as DataInstanceStore<CourseSection>).item! as CourseSection),
      changeModalScreenSize: this.setFullScreenModal.bind(null, !this.fullScreenModal),
    } : {
      courseId: this.props.courseId,
      templateId: this.props.selectedSection.id,
      okFinishFeedbackHandler: this.props.onFinishSection,
      onCloseModal: this.props.onCloseModal,
      changeModalScreenSize: this.setFullScreenModal.bind(null, !this.fullScreenModal),
      feedbacks: (this.sectionData as LearningFeedbackQuestion[]).map(lfq => {
        return {
          id: lfq.id,
          answers: lfq.answers,
          questionLangValue1: (lfq as SerializedEntity<LearningFeedbackQuestion>).questionLangValue1,
          questionType: lfq.questionType,
        } as FeedbackCourse
      })
    });
    const renderModalBody: RenderModalBody = new RenderModalBodyImpl();
    return renderModalBody.renderBody(this.props.selectedSection.type, {
      ...params,
      onFinishSection: this.props.onFinishSection,
      enrollmentId: this.props.enrollmentId
    });
  };

  componentDidMount(): void {
    switch (this.props.selectedSection.type) {
      case "feedback": {
        restServices.lmsService.loadFeedbackData({feedbackTemplateId: this.props.selectedSection.id}).then((response: LearningFeedbackQuestion[]) => {
          this.sectionData = response;
        });
        break;
      }
      case "course-section": {
        this.sectionData = instance<CourseSection>(CourseSection.NAME, {
          view: "course.section.with.format.session",
        });
        this.sectionData.load(this.props.selectedSection.id);
        break;
      }
    }
  }
}

export default CourseSectionModal;