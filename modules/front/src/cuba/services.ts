import {FetchOptions} from "@cuba-platform/rest";
import {getCubaREST} from "@cuba-platform/react";
import {SortOrder} from "antd/lib/table/interface";

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
  kpiService: {
    myKpiList: (params?: DefaultRestParams, fetchOpts?: FetchOptions): Promise<string> => {
      return getCubaREST()!.invokeService(
        "tsadv_KpiService",
        "loadUsersPerformancePlans",
        {...params},
        fetchOpts
      );
    },
    myKpiListCount: (params?: DefaultRestParams, fetchOpts?: FetchOptions): Promise<number> => {
      return getCubaREST()!.invokeService(
        "tsadv_KpiService",
        "countUsersPerformancePlans",
        {...params},
        fetchOpts
      );
    },
    edit: (fetchOpts?: FetchOptions): Promise<string> => {
      return new Promise<string>(() => {
        return `{
              "personFullName": "Аубакиров Биржан Маратович",
              "positionName": "Разработчик",
              "orgName": "Моё подразделение",
              "compName": "Моя компания",
              "gradeName": "Случайный грейд",
              "managerName": "Манагер-руководитель",
              "startDate": "2020-01-05 00:00:00.000",
              "endDate": "2020-01-04 00:00:00.000",
              "status": "DRAFT"
        }`
      });
    }
  }
};
