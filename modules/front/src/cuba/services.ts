import {FetchOptions} from "@cuba-platform/rest";
import {getCubaREST} from "@cuba-platform/react";
import {SortOrder} from "antd/lib/table/interface";
import {Course} from "./entities/base/tsadv$Course";

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
  }
};
