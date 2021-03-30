import React, {Component} from 'react';
import {CourseSection} from "../../../../../cuba/entities/base/tsadv$CourseSection";
import Video from "../../../../components/Video";
import AbstractRenderModalBody from "../AbstractRenderModalBody";
import {observer} from "mobx-react";
import {observable} from "mobx";
import {getBlobUrl} from "../../../../util/util";
import {CourseSectionAttempt} from "../../../../../cuba/entities/base/tsadv$CourseSectionAttempt";

type VideoCourseSectionRenderProps = {
  courseSection: CourseSection
  onFinishSection: () => Promise<CourseSectionAttempt>
}

@observer
class VideoCourseSectionRender extends AbstractRenderModalBody<VideoCourseSectionRenderProps> {

  @observable
  videoUrl: string;

  getModalBody = () => {
    return <div className="course-section-modal-body">
      <video controls={true} src={this.videoUrl}
             style={{width: '100%', height: '100%'}}/>
    </div>
  };

  componentDidMount() {
    super.componentDidMount();

    getBlobUrl(this.props.courseSection.sectionObject!.content!.file!.id!).then(fileUrl => {
      this.videoUrl = fileUrl
    })
  }

  onFinishSection = () => {
    this.props.onFinishSection();
  }
}

export default VideoCourseSectionRender;