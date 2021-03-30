import React from 'react';
import {CourseSection} from "../../../../../cuba/entities/base/tsadv$CourseSection";
import AbstractRenderModalBody from "../AbstractRenderModalBody";
import {CourseSectionAttempt} from "../../../../../cuba/entities/base/tsadv$CourseSectionAttempt";

type UrlScormCourseSectionRenderProps = {
  courseSection: CourseSection
  onFinishSection: () => Promise<CourseSectionAttempt>
}

class UrlCourseSectionRender extends AbstractRenderModalBody<UrlScormCourseSectionRenderProps> {
  getModalBody = () => {
    return <div className="course-section-modal-body">
      <iframe width="100%" height="100%" src={this.props.courseSection.sectionObject!.content!.url!}/>
    </div>
  };

  onFinishSection = () => {
    this.props.onFinishSection();
  };
}

export default UrlCourseSectionRender;