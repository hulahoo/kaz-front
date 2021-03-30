import React from 'react';
import AbstractRenderModalBody from "../AbstractRenderModalBody";
import {CourseSection} from "../../../../../cuba/entities/base/tsadv$CourseSection";
import {observable} from "mobx";
import {observer} from "mobx-react";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {getBlobUrl} from "../../../../util/util";
import {Spin} from "antd";
import {CourseSectionAttempt} from "../../../../../cuba/entities/base/tsadv$CourseSectionAttempt";

type HtmlCourseSectionRenderProps = {
  courseSection: CourseSection
  onFinishSection: () => Promise<CourseSectionAttempt>
}

type FileInfo = {
  url: string,
  fullName: string
}

@observer
class FileCourseSectionRender extends AbstractRenderModalBody<HtmlCourseSectionRenderProps & WrappedComponentProps> {

  @observable
  file: FileInfo;

  getModalBody = (): React.ReactNode => {
    return <div className="course-section-modal-body">
      <Spin spinning={this.file == undefined}>
        {this.file != undefined
          ? <a href={this.file.url} target="_blank" download={this.file.fullName}>{this.file.fullName}</a>
          : <></>
        }
      </Spin>
    </div>
  };

  onFinishSection = () => {
    this.props.onFinishSection();
  };

  componentDidMount() {
    super.componentDidMount();

    getBlobUrl(this.props.courseSection.sectionObject!.content!.file!.id).then(fileUrl => {
      this.file = {
        fullName: `${this.props.courseSection.sectionObject!.content!.file!.name}.${this.props.courseSection.sectionObject!.content!.file!.extension}`,
        url: fileUrl
      };
    })
  }
}

export default injectIntl(FileCourseSectionRender);