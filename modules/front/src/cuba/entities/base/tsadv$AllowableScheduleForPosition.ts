import { AbstractParentEntity } from "./AbstractParentEntity";
import { PositionGroupExt } from "./base$PositionGroupExt";
import { StandardSchedule } from "./tsadv$StandardSchedule";
export class AllowableScheduleForPosition extends AbstractParentEntity {
  static NAME = "tsadv$AllowableScheduleForPosition";
  positionGroup?: PositionGroupExt | null;
  schedule?: StandardSchedule | null;
  startDate?: any | null;
  endDate?: any | null;
}
export type AllowableScheduleForPositionViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "allowableScheduleForPosition-view";
export type AllowableScheduleForPositionView<
  V extends AllowableScheduleForPositionViewName
> = V extends "_local"
  ? Pick<
      AllowableScheduleForPosition,
      | "id"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      AllowableScheduleForPosition,
      | "id"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "allowableScheduleForPosition-view"
  ? Pick<
      AllowableScheduleForPosition,
      | "id"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "schedule"
    >
  : never;
