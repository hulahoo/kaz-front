import { AbstractParentEntity } from "./AbstractParentEntity";
import { StandardSchedule } from "./tsadv$StandardSchedule";
import { OrgAnalytics } from "./tsadv$OrgAnalytics";
export class StandardOffset extends AbstractParentEntity {
  static NAME = "tsadv$StandardOffset";
  standardSchedule?: StandardSchedule | null;
  offsetDisplay?: string | null;
  offsetDisplayDays?: number | null;
  startDate?: any | null;
  endDate?: any | null;
  orgAnalytics?: OrgAnalytics | null;
  offsetScheduleName?: string | null;
}
export type StandardOffsetViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "standardOffset-with-schedule-view"
  | "standardOffset.view";
export type StandardOffsetView<
  V extends StandardOffsetViewName
> = V extends "_base"
  ? Pick<
      StandardOffset,
      | "id"
      | "offsetDisplay"
      | "offsetDisplayDays"
      | "startDate"
      | "endDate"
      | "offsetScheduleName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      StandardOffset,
      | "id"
      | "offsetDisplay"
      | "offsetDisplayDays"
      | "startDate"
      | "endDate"
      | "offsetScheduleName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<StandardOffset, "id">
  : V extends "standardOffset-with-schedule-view"
  ? Pick<
      StandardOffset,
      | "id"
      | "offsetDisplay"
      | "offsetDisplayDays"
      | "startDate"
      | "endDate"
      | "offsetScheduleName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "standardSchedule"
    >
  : V extends "standardOffset.view"
  ? Pick<
      StandardOffset,
      | "id"
      | "offsetDisplay"
      | "offsetDisplayDays"
      | "startDate"
      | "endDate"
      | "offsetScheduleName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "standardSchedule"
      | "offsetScheduleName"
    >
  : never;
