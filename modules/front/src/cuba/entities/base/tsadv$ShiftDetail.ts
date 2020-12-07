import { AbstractParentEntity } from "./AbstractParentEntity";
import { Shift } from "./tsadv$Shift";
import { DicScheduleElementType } from "./tsadv$DicScheduleElementType";
export class ShiftDetail extends AbstractParentEntity {
  static NAME = "tsadv$ShiftDetail";
  name?: string | null;
  timeFrom?: any | null;
  timeTo?: any | null;
  shift?: Shift | null;
  elementType?: DicScheduleElementType | null;
  dayFrom?: number | null;
  dayTo?: number | null;
}
export type ShiftDetailViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "shiftDetail.view";
export type ShiftDetailView<
  V extends ShiftDetailViewName
> = V extends "_minimal"
  ? Pick<ShiftDetail, "id">
  : V extends "_local"
  ? Pick<
      ShiftDetail,
      | "id"
      | "name"
      | "timeFrom"
      | "timeTo"
      | "dayFrom"
      | "dayTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      ShiftDetail,
      | "id"
      | "name"
      | "timeFrom"
      | "timeTo"
      | "dayFrom"
      | "dayTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "shiftDetail.view"
  ? Pick<
      ShiftDetail,
      | "id"
      | "name"
      | "timeFrom"
      | "timeTo"
      | "dayFrom"
      | "dayTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "shift"
      | "elementType"
    >
  : never;
