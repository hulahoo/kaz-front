import React from 'react';
import {CourseSection} from "../../../../../cuba/entities/base/tsadv$CourseSection";
import AbstractRenderModalBody from "../AbstractRenderModalBody";
import ScormIntegrationApi from "../ScormIntegrationApi/ScormIntegrationApi";
import {CourseSectionAttempt} from "../../../../../cuba/entities/base/tsadv$CourseSectionAttempt";
import {restServices} from "../../../../../cuba/services";
import Notification from "../../../../util/Notification/Notification";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {observer} from "mobx-react";

type ScormCourseSectionRenderProps = {
  courseSection: CourseSection
  enrollmentId: string
  onFinishSection: () => Promise<CourseSectionAttempt>
  setLoadingFinishCourseSection: (value: boolean) => void
  finishedCourseSection: (courseSectionId: string) => void
}

@observer
class ScormCourseSectionRender extends AbstractRenderModalBody<ScormCourseSectionRenderProps & WrappedComponentProps> {

  scormIntegrationApi = new ScormIntegrationApi();

  getModalBody = () => {
    return <div className="course-section-modal-body">
      <iframe width="100%" height="100%" src={this.props.courseSection.sectionObject!.content!.url!}/>
    </div>
  };

  onFinishSection = () => {
    this.props.finishedCourseSection(this.props.courseSection.id);
    this.props.selectNextSection!();
  };

  componentWillUnmount(): void {
    this.scormIntegrationApi.destroy();
  }

  componentDidMount() {
    this.setIsDisabledFinishSectionBtn(this.props.courseSection.courseSectionAttempts!.length === 0);

    this.scormIntegrationApi.onScormTestFinish = (score, maxScore, minScore, success) => {
      this.props.setLoadingFinishCourseSection(true);

      restServices.courseService.createTestScormAttempt({
        enrollmentId: this.props.enrollmentId,
        courseSectionId: this.props.courseSection.id,
        score: score,
        maxScore: maxScore,
        minScore: minScore,
      }).then(response => {
        if (success) {
          this.setIsDisabledFinishSectionBtn(this.scormIntegrationApi.isSucceedFinishedScorm());
        }
      }).catch(reason => {
        Notification.error({
          message: this.props.intl.formatMessage({id: "courseSection.createAttempt.error"})
        });
        this.props.setLoadingFinishCourseSection(false);
      });
    };

    this.scormIntegrationApi.onScormDefaultFinish = (inputData, success) => {
      this.props.setLoadingFinishCourseSection(true);

      restServices.courseService.createScormAttempt({
        enrollmentId: this.props.enrollmentId,
        courseSectionId: this.props.courseSection.id,
        inputData: inputData
      }).then(response => {
        if (success) {
          this.setIsDisabledFinishSectionBtn(this.scormIntegrationApi.isSucceedFinishedScorm());
        }
      }).catch(reason => {
        Notification.error({
          message: this.props.intl.formatMessage({id: "courseSection.createAttempt.error"})
        });
        this.props.setLoadingFinishCourseSection(false);
      });
    };
  }
}

export default injectIntl(ScormCourseSectionRender);