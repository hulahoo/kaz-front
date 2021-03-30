import React from 'react';
import {CourseSection} from "../../../../../cuba/entities/base/tsadv$CourseSection";
import AbstractRenderModalBody from "../AbstractRenderModalBody";
import {getCubaREST} from "@cuba-platform/react";
import {observable} from "mobx";
import Pdf from "@mikecousins/react-pdf";
import {getBlobUrl} from "../../../../util/util";
import {observer} from "mobx-react";

type PdfCourseSectionRenderProps = {
  courseSection: CourseSection
  onFinishSection: () => void
}

@observer
class PdfCourseSectionRender extends AbstractRenderModalBody<PdfCourseSectionRenderProps> {

  @observable
  pdfUrl: any;

  getModalBody = () => {
    return (<div className="course-section-modal-body">
      <iframe src={this.pdfUrl}
              style={{width: '100%', height: '100%'}}/>
    </div>)
  };

  onFinishSection = () => {
    this.props.onFinishSection();
  };

  componentDidMount() {
    super.componentDidMount();
    getBlobUrl(this.props.courseSection.sectionObject!.content!.file!.id!)
      .then(fileUrl => {
        this.pdfUrl = fileUrl;
      });
  }
}

export default PdfCourseSectionRender;