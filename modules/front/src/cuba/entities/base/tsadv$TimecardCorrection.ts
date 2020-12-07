import { AbstractParentEntity } from "./AbstractParentEntity";
import { AssignmentGroupExt } from "./base$AssignmentGroupExt";
export class TimecardCorrection extends AbstractParentEntity {
  static NAME = "tsadv$TimecardCorrection";
  assignmentGroup?: AssignmentGroupExt | null;
  dateFrom?: any | null;
  dateTo?: any | null;
}
export type TimecardCorrectionViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "timecardCorrection-with-assignmentGroup";
export type TimecardCorrectionView<
  V extends TimecardCorrectionViewName
> = V extends "_local"
  ? Pick<
      TimecardCorrection,
      | "id"
      | "dateFrom"
      | "dateTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      TimecardCorrection,
      | "id"
      | "dateFrom"
      | "dateTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "timecardCorrection-with-assignmentGroup"
  ? Pick<
      TimecardCorrection,
      | "id"
      | "dateFrom"
      | "dateTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "assignmentGroup"
    >
  : never;
