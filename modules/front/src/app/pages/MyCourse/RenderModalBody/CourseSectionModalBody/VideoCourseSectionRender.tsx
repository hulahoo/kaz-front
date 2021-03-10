import React, {Component} from 'react';
import {CourseSection} from "../../../../../cuba/entities/base/tsadv$CourseSection";
import Video from "../../../../components/Video";
import AbstractRenderModalBody from "../AbstractRenderModalBody";

type VideoCourseSectionRenderProps = {
  courseSection: CourseSection
  onFinishSection: () => void
}

class VideoCourseSectionRender extends AbstractRenderModalBody<VideoCourseSectionRenderProps> {
  getModalBody = () => {
    return <div className="course-section-modal-body">
      <video controls={true} src={this.props.courseSection.sectionObject!.content!.file!.id!} style={{width: '100%', height: '100%'}}/>
      {/*<Video fileId={this.props.courseSection.sectionObject!.content!.file!.id!}/>*/}
    </div>
  };

  onFinishSection = () => {
    this.props.onFinishSection();
  }
}

export default VideoCourseSectionRender;