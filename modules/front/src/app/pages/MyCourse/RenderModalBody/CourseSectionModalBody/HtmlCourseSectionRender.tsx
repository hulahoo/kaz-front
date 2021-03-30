import React from 'react';
import AbstractRenderModalBody from "../AbstractRenderModalBody";
import {CourseSection} from "../../../../../cuba/entities/base/tsadv$CourseSection";
import {CourseSectionAttempt} from "../../../../../cuba/entities/base/tsadv$CourseSectionAttempt";

type HtmlCourseSectionRenderProps = {
  courseSection: CourseSection
  onFinishSection: () => Promise<CourseSectionAttempt>
}

class HtmlCourseSectionRender extends AbstractRenderModalBody<HtmlCourseSectionRenderProps> {
  getModalBody = (): React.ReactNode => {
    return <div dangerouslySetInnerHTML={{__html: this.props.courseSection.sectionObject!.content!.html!}}
                className="course-section-modal-body"/>
  };

  onFinishSection = () => {
    this.props.onFinishSection();
  }
}

export default HtmlCourseSectionRender;