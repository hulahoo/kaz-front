import React from 'react';
import {CourseSection} from "../../../../../cuba/entities/base/tsadv$CourseSection";
import AbstractRenderModalBody from "../AbstractRenderModalBody";
import ScormIntegrationApi from "../ScormIntegrationApi/ScormIntegrationApi";
import {CourseSectionAttempt} from "../../../../../cuba/entities/base/tsadv$CourseSectionAttempt";

type ScormCourseSectionRenderProps = {
  courseSection: CourseSection
  onFinishSection: () => Promise<CourseSectionAttempt>
}

class ScormCourseSectionRender extends AbstractRenderModalBody<ScormCourseSectionRenderProps> {

  scormIntegrationApi = new ScormIntegrationApi();

  getModalBody = () => {
    return <div className="course-section-modal-body">
      <iframe width="100%" height="100%" src={this.props.courseSection.sectionObject!.content!.url!}/>
    </div>
  };

  onFinishSection = () => {
    this.props.onFinishSection().then(attempt => {
      console.log(this.scormIntegrationApi.getInputData());
    });
  };

  componentWillUnmount(): void {
    this.scormIntegrationApi.destroy();
  }

  componentDidMount() {
    this.setIsDisabledFinishSectionBtn(this.props.courseSection.courseSectionAttempts!.length === 0);
    this.scormIntegrationApi.commit = () => {
      this.setIsDisabledFinishSectionBtn(this.scormIntegrationApi.isSucceedFinishedScorm());
      if (this.scormIntegrationApi.isSucceedFinishedScorm()) {
        console.log(this.scormIntegrationApi.getInputData());
      }
    }
  }
}

export default ScormCourseSectionRender;