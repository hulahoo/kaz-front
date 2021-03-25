import React from 'react';
import {CourseSection} from "../../../../../cuba/entities/base/tsadv$CourseSection";
import AbstractRenderModalBody from "../AbstractRenderModalBody";

declare global {
  interface Window {
    API_1484_11: any;
  }
}

type ScormCourseSectionRenderProps = {
  courseSection: CourseSection
  onFinishSection: () => void
}

class ScormCourseSectionRender extends AbstractRenderModalBody<ScormCourseSectionRenderProps> {
  getModalBody = () => {
    return <div className="course-section-modal-body">
      <iframe width="100%" height="100%" src={this.props.courseSection.sectionObject!.content!.url!}/>
    </div>
  };

  onFinishSection = () => {
    this.props.onFinishSection();
  };

  componentWillUnmount(): void {
    delete window.API_1484_11;
  }

  componentDidMount() {
    this.setIsDisabledFinishSectionBtn(this.props.courseSection.courseSectionAttempts!.length === 0);
    window.API_1484_11 = {
      Initialize: () => {
      },
      GetValue: (property: string, value: string) => {
      },
      Finish: () => {
      },
      SetValue: (property: string, value: string) => {
        window.API_1484_11[property] = value;
      },
      Commit: () => {
        this.setIsDisabledFinishSectionBtn(window.API_1484_11['cmi.completion_status'].toLowerCase() !== 'completed');
      },
      GetLastError: () => {

      },
      GetErrorString: () => {

      },
      GetDiagnostic: () => {

      }
    }
  }
}

export default ScormCourseSectionRender;