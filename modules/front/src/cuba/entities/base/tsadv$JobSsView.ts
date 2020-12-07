import { StandardEntity } from "./sys$StandardEntity";
import { JobGroup } from "./tsadv$JobGroup";
import { DicEmployeeCategory } from "./tsadv$DicEmployeeCategory";
export class JobSsView extends StandardEntity {
  static NAME = "tsadv$JobSsView";
  startDate?: any | null;
  endDate?: any | null;
  jobGroup?: JobGroup | null;
  jobNameRu?: string | null;
  jobNameKz?: string | null;
  jobNameEn?: string | null;
  jobName?: string | null;
  maxStartDate?: string | null;
  employeeCategory?: DicEmployeeCategory | null;
}
export type JobSsViewViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "jobSsView-view";
export type JobSsViewView<V extends JobSsViewViewName> = V extends "_local"
  ? Pick<
      JobSsView,
      | "id"
      | "startDate"
      | "endDate"
      | "jobNameRu"
      | "jobNameKz"
      | "jobNameEn"
      | "maxStartDate"
    >
  : V extends "_base"
  ? Pick<
      JobSsView,
      | "id"
      | "startDate"
      | "endDate"
      | "jobNameRu"
      | "jobNameKz"
      | "jobNameEn"
      | "maxStartDate"
    >
  : V extends "jobSsView-view"
  ? Pick<
      JobSsView,
      | "id"
      | "startDate"
      | "endDate"
      | "jobNameRu"
      | "jobNameKz"
      | "jobNameEn"
      | "maxStartDate"
      | "employeeCategory"
      | "jobGroup"
    >
  : never;
