import React from 'react';
import {CourseSection} from "../../../../../cuba/entities/base/tsadv$CourseSection";
import AbstractRenderModalBody from "../AbstractRenderModalBody";
import {getCubaREST} from "@cuba-platform/react";
import {observable} from "mobx";
import Pdf from "@mikecousins/react-pdf";

type PdfCourseSectionRenderProps = {
  courseSection: CourseSection
  onFinishSection: () => void
}

class PdfCourseSectionRender extends AbstractRenderModalBody<PdfCourseSectionRenderProps> {

  @observable
  iframe: any;

  getModalBody = () => {
    return (<div className="course-section-modal-body">
      {/*<video controls={true} src={this.props.courseSection.sectionObject!.content!.file!.id!}*/}
      {/*       style={{width: '100%', height: '100%'}}/>*/}
      {/*{this.iframe}*/}
      {/*<Video fileId={this.props.courseSection.sectionObject!.content!.file!.id!}/>*/}

      {/*<iframe id="pdfViewer"
              src="C:\Users\Lenovo\Downloads\вудуеу\testpdf.pdf"/>*/}
      {/*<Pdf file={'C:\\Users\\Lenovo\\Downloads\\вудуеу\\testpdf\.pdf'} page={1}/>*/}
      <Pdf file={'C:/Users/Lenovo/Downloads/вудуеу/testpdf/.pdf'}/>
    </div>)
  };

  onFinishSection = () => {
    this.props.onFinishSection();
  }

  componentDidMount() {
    super.componentDidMount();
    // PDFView
    getCubaREST()!.getFile(this.props.courseSection.sectionObject!.content!.file!.id!).then((value: Blob) => {
      var url = URL.createObjectURL(value);
      var viewerUrl = 'scripts/pdfViewer/web/viewer.html?file=' + encodeURIComponent(url);
      // window.open(viewerUrl, "_blank");
    });
  }
}

export default PdfCourseSectionRender;