import { AbstractDictionary } from "./AbstractDictionary";
export class DicBusinessTripType extends AbstractDictionary {
  static NAME = "tsadv$DicBusinessTripType";
  timesheetCode?: string | null;
  timecardWeekendCode?: string | null;
  workingDay?: boolean | null;
}
export type DicBusinessTripTypeViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "dicBusinessTripType-view";
export type DicBusinessTripTypeView<
  V extends DicBusinessTripTypeViewName
> = V extends "_minimal"
  ? Pick<DicBusinessTripType, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      DicBusinessTripType,
      | "id"
      | "timesheetCode"
      | "timecardWeekendCode"
      | "workingDay"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "langValue1"
      | "description1"
      | "langValue2"
      | "description2"
      | "langValue3"
      | "description3"
      | "langValue4"
      | "description4"
      | "langValue5"
      | "description5"
      | "startDate"
      | "endDate"
      | "code"
      | "isSystemRecord"
      | "active"
      | "isDefault"
      | "order"
    >
  : V extends "_base"
  ? Pick<
      DicBusinessTripType,
      | "id"
      | "langValue"
      | "timesheetCode"
      | "timecardWeekendCode"
      | "workingDay"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "langValue1"
      | "description1"
      | "langValue2"
      | "description2"
      | "langValue3"
      | "description3"
      | "langValue4"
      | "description4"
      | "langValue5"
      | "description5"
      | "startDate"
      | "endDate"
      | "code"
      | "isSystemRecord"
      | "active"
      | "isDefault"
      | "order"
    >
  : V extends "dicBusinessTripType-view"
  ? Pick<
      DicBusinessTripType,
      | "id"
      | "timesheetCode"
      | "timecardWeekendCode"
      | "workingDay"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "langValue1"
      | "description1"
      | "langValue2"
      | "description2"
      | "langValue3"
      | "description3"
      | "langValue4"
      | "description4"
      | "langValue5"
      | "description5"
      | "startDate"
      | "endDate"
      | "code"
      | "isSystemRecord"
      | "active"
      | "isDefault"
      | "order"
    >
  : never;
