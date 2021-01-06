import { AbstractParentEntity } from "./AbstractParentEntity";
import { AssignmentGroupExt } from "./base$AssignmentGroupExt";
export class TimecardDeviation extends AbstractParentEntity {
  static NAME = "tsadv$TimecardDeviation";
  assignmentGroup?: AssignmentGroupExt | null;
  hours?: any | null;
  dateFrom?: any | null;
  dateTo?: any | null;
  isChangesFactHours?: boolean | null;
  isChangesPlanHours?: boolean | null;
  isChangesDetailsFromBegin?: boolean | null;
  changesWeekends?: boolean | null;
}
export type TimecardDeviationViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "timecardDeviation-for-form-timecard"
  | "timecardDeviation-for-timecard-copy"
  | "timecardDeviation-view";
export type TimecardDeviationView<
  V extends TimecardDeviationViewName
> = V extends "_base"
  ? Pick<
      TimecardDeviation,
      | "id"
      | "hours"
      | "dateFrom"
      | "dateTo"
      | "isChangesFactHours"
      | "isChangesPlanHours"
      | "isChangesDetailsFromBegin"
      | "changesWeekends"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      TimecardDeviation,
      | "id"
      | "hours"
      | "dateFrom"
      | "dateTo"
      | "isChangesFactHours"
      | "isChangesPlanHours"
      | "isChangesDetailsFromBegin"
      | "changesWeekends"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "timecardDeviation-for-form-timecard"
  ? Pick<
      TimecardDeviation,
      | "id"
      | "hours"
      | "dateFrom"
      | "dateTo"
      | "isChangesFactHours"
      | "isChangesPlanHours"
      | "isChangesDetailsFromBegin"
      | "changesWeekends"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "assignmentGroup"
    >
  : V extends "timecardDeviation-for-timecard-copy"
  ? Pick<
      TimecardDeviation,
      | "id"
      | "hours"
      | "dateFrom"
      | "dateTo"
      | "isChangesFactHours"
      | "isChangesPlanHours"
      | "isChangesDetailsFromBegin"
      | "changesWeekends"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "timecardDeviation-view"
  ? Pick<
      TimecardDeviation,
      | "id"
      | "hours"
      | "dateFrom"
      | "dateTo"
      | "isChangesFactHours"
      | "isChangesPlanHours"
      | "isChangesDetailsFromBegin"
      | "changesWeekends"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
