import React from 'react';
import AbstractRenderModalBody from "../AbstractRenderModalBody";
import {CourseSection} from "../../../../../cuba/entities/base/tsadv$CourseSection";

type HtmlCourseSectionRenderProps = {
  courseSection: CourseSection
  onFinishSection: () => void
}

class TextCourseSectionRender extends AbstractRenderModalBody<HtmlCourseSectionRenderProps> {
  getModalBody = (): React.ReactNode => {
    return <div dangerouslySetInnerHTML={{__html: this.props.courseSection.sectionObject!.content!.text!}} style={{overflowY: 'auto'}}
                className="course-section-modal-body"/>
  };

  onFinishSection = () => {
    this.props.onFinishSection();
  }
}

export default TextCourseSectionRender;