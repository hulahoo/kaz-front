import {FetchOptions} from "@cuba-platform/rest";
import {getCubaREST} from "@cuba-platform/react";
import {SortOrder} from "antd/lib/table/interface";
import {Course} from "./entities/base/tsadv$Course";
import moment from "moment";

export const DEFAULT_DATE_PARSE_FORMAT = "YYYY-MM-DD";
export const DEFAULT_DATE_TIME_PARSE_FORMAT = "YYYY-MM-DD";

export type Sort = {
  columnKey: string,
  order: SortOrder
}

export type DefaultRestParams = {
  page?: number,
  pageSize?: number,
  sort?: Sort
}

export type CourseTrainerInfo = {
  fullName?: string,
  finished?: number,
  courseCount?: number,
  image?: any,
  comments?: any[],
}

export const restServices = {
  userMenuService: {
    getTimeZones: (params?: {}, fetchOpts?: FetchOptions) => {
      return getCubaREST()!.invokeService(
        "tsadv_UserSettingService",
        "getTimeZones",
        {...params},
        fetchOpts
      );
    },
    changePassword: (params: { oldPassword: string, newPassword: string }, fetchOpts?: FetchOptions) => {
      return getCubaREST()!.invokeService(
        "tsadv_LmsService",
        "changePassword",
        {...params},
        fetchOpts
      );
    },
  },
  notificationsService: {
    notifications: (params?: {}, fetchOpts?: FetchOptions) => {
      return getCubaREST()!.invokeService(
        "tsadv_NotificationService",
        "notifications",
        {...params},
        fetchOpts
      );
    }
  },
  learningService: {
    learningHistory: (params: { personGroupId: string }): Promise<Course[]> => {
      return getCubaREST()!.invokeService(
        "tsadv_LearningService",
        "learningHistory",
        {...params}
      ).then((response: string) => {
        return JSON.parse(response);
      });
    }
  },
  courseService: {
    courseInfo: (params: { courseId: string }): Promise<CourseInfo> => {
      return getCubaREST()!.invokeService(
        "tsadv_CourseService",
        "courseInfo",
        {...params}
      ).then((response: string) => {
        const courseInfo: CourseInfo = JSON.parse(response) as CourseInfo;
        courseInfo.startDate = moment(courseInfo.startDate, DEFAULT_DATE_PARSE_FORMAT);
        courseInfo.endDate = moment(courseInfo.endDate, DEFAULT_DATE_PARSE_FORMAT);

        return courseInfo;
      });
    },
    courseTrainerInfo: (params: { trainerId: string }): Promise<CourseTrainerInfo> => {
      return getCubaREST()!.invokeService(
        "tsadv_CourseService",
        "courseTrainerInfo",
        {...params}
      ).then((response: string) => {
        return JSON.parse(response);
      });
    }
  }
};

export type CourseInfo = {
  name: string
  avgRate: number
  preRequisitions: string
  trainers: any[]
  startDate: moment.Moment
  endDate: moment.Moment
  finished: number
  certificateUrl: string
  sections: any[]
  logo: any
  comments: any[]
  isIssuedCertificate: boolean
}