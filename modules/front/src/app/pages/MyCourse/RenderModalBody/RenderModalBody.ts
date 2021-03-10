import * as React from "react";
import TestCourseSectionRender from "./CourseSectionModalBody/TestCourseSectionRender";
import HtmlCourseSectionRender from "./CourseSectionModalBody/HtmlCourseSectionRender";
import UrlScormCourseSectionRender from "./CourseSectionModalBody/UrlScormCourseSectionRender";
import VideoCourseSectionRender from "./CourseSectionModalBody/VideoCourseSectionRender";
import FeedbackCourseSectionRender from "./Feedback/FeedbackCourseSectionRender";
import Notification from "../../../util/Notification/Notification";

export type CourseSectionRenderType = "course-section" | "feedback";

export interface RenderModalBody {
  renderBody: (type: string, params: any) => React.ReactNode
}

export default class RenderModalBodyImpl implements RenderModalBody {
  renderBody = (type: CourseSectionRenderType, params: any): React.ReactNode => {
    switch (type) {
      case "course-section": {
        return this.getCourseSectionRenderBody(params);
      }
      case "feedback": {
        return this.getFeedbackRenderBody(params);
      }
      default: {
        return null;
      }
    }
  };

  getCourseSectionRenderBody = (params: any): React.ReactNode => {
    if (!params.courseSection.sectionObject) {
      Notification.error({message: "У раздела отсутствует объект раздела!"});
      return;
    }

    if (params.courseSection.sectionObject!.test) {
      return React.createElement(TestCourseSectionRender, {...params});
    } else if (params.courseSection.sectionObject!.content!.contentType === "HTML") {
      return React.createElement(HtmlCourseSectionRender, {...params});
    } else if (params.courseSection.sectionObject!.content!.contentType === "URL"
      || params.courseSection.sectionObject!.content!.contentType === "SCORM_ZIP") {
      return React.createElement(UrlScormCourseSectionRender, {...params});
    } else if (params.courseSection.sectionObject!.content!.contentType === "VIDEO") {
      return React.createElement(VideoCourseSectionRender, {...params});
    }
    return null;
  };

  getFeedbackRenderBody = (params: any) => {
    return React.createElement(FeedbackCourseSectionRender, {
      okFinishFeedbackHandler: params.onFinishSection,
      ...params
    })
  }
}