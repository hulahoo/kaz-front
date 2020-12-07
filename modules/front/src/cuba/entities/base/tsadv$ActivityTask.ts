import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { Activity } from "./uactivity$Activity";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class ActivityTask extends BaseUuidEntity {
  static NAME = "tsadv$ActivityTask";
  activity?: Activity | null;
  orderCode?: string | null;
  processEn?: string | null;
  personGroup?: PersonGroupExt | null;
  orderDate?: any | null;
  status?: number | null;
  processRu?: string | null;
  startDate?: any | null;
  expiryDate?: any | null;
  isExpiredTask?: boolean | null;
  detailRu?: string | null;
  detailEn?: string | null;
}
export type ActivityTaskViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "activityTask.view";
export type ActivityTaskView<
  V extends ActivityTaskViewName
> = V extends "_minimal"
  ? Pick<ActivityTask, "id" | "orderCode">
  : V extends "_local"
  ? Pick<
      ActivityTask,
      | "id"
      | "orderCode"
      | "processEn"
      | "orderDate"
      | "status"
      | "processRu"
      | "startDate"
      | "expiryDate"
      | "isExpiredTask"
      | "detailRu"
      | "detailEn"
    >
  : V extends "_base"
  ? Pick<
      ActivityTask,
      | "id"
      | "orderCode"
      | "processEn"
      | "orderDate"
      | "status"
      | "processRu"
      | "startDate"
      | "expiryDate"
      | "isExpiredTask"
      | "detailRu"
      | "detailEn"
    >
  : V extends "activityTask.view"
  ? Pick<
      ActivityTask,
      | "id"
      | "orderCode"
      | "processEn"
      | "orderDate"
      | "status"
      | "processRu"
      | "startDate"
      | "expiryDate"
      | "isExpiredTask"
      | "detailRu"
      | "detailEn"
      | "activity"
      | "personGroup"
    >
  : never;
