import React, {Component} from 'react';
import {Modal} from "antd";
import {observer} from "mobx-react";
import {CourseSection} from "../../../cuba/entities/base/tsadv$CourseSection";
import RenderModalBodyImpl, {RenderModalBody} from "./RenderModalBody/RenderModalBody";
import {restServices} from "../../../cuba/services";
import {action, observable} from "mobx";
import {SelectedSection} from "./EnrollmentEdit";
import {FeedbackCourse} from "./RenderModalBody/Feedback/FeedbackComponent";
import {LearningFeedbackQuestion} from "../../../cuba/entities/base/tsadv$LearningFeedbackQuestion";
import {SerializedEntity} from "@cuba-platform/rest";
import {ServiceDataInstanceStore, serviceInstance} from "../../util/ServiceDataInstanceStore";
import {CourseSectionAttempt} from "../../../cuba/entities/base/tsadv$CourseSectionAttempt";

type Props = {
  courseId: string,
  loadingFinishCourse: boolean,
  selectedSection: SelectedSection
  enrollmentId: string,
  onCloseModal?: () => void
  onFinishTest?: () => void
  onFinishSection?: () => Promise<CourseSectionAttempt>
}

@observer
class CourseSectionModal extends Component<Props> {

  @observable
  sectionData: ServiceDataInstanceStore<CourseSection> | LearningFeedbackQuestion[];

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
        : (this.sectionData as ServiceDataInstanceStore<CourseSection>).status != "DONE"
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
    return !loading ? this.props.selectedSection.type === "course-section" && (this.sectionData as ServiceDataInstanceStore<CourseSection>).item!.sectionObject ? (this.sectionData as ServiceDataInstanceStore<CourseSection>).item!.sectionObject!.test != undefined : false : false;
  };

  getSectionBody = () => {
    const params = ((this.sectionData as ServiceDataInstanceStore<CourseSection>).item ? {
      courseSection: ((this.sectionData as ServiceDataInstanceStore<CourseSection>).item! as CourseSection),
    } : {
      templateId: this.props.selectedSection.id,
      okFinishFeedbackHandler: this.props.onFinishSection,
      onCloseModal: this.props.onCloseModal,
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
      loadingFinishCourse: this.props.loadingFinishCourse,
      courseId: this.props.courseId,
      changeModalScreenSize: this.setFullScreenModal.bind(null, !this.fullScreenModal),
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
        this.sectionData = serviceInstance<CourseSection>(restServices.courseService.courseSectionWithEnrollmentAttempts.bind(null, {
          courseSectionId: this.props.selectedSection.id,
          enrollmentId: this.props.enrollmentId,
        }));
        this.sectionData.load("");
        break;
      }
    }
  }
}

export default CourseSectionModal;