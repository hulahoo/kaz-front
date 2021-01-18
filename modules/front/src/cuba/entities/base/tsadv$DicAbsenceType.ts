import { AbstractDictionary } from "./AbstractDictionary";
import { DicAbsenceCategory } from "./tsadv$DicAbsenceCategory";
export class DicAbsenceType extends AbstractDictionary {
  static NAME = "tsadv$DicAbsenceType";
  useInSelfService?: boolean | null;
  vacationDurationType?: any | null;
  elmaTransfer?: boolean | null;
  useInBalance?: boolean | null;
  ignoreHolidays?: boolean | null;
  isOnlyWorkingDay?: boolean | null;
  absenceCategory?: DicAbsenceCategory | null;
  timesheetCode?: string | null;
  isWorkingDay?: boolean | null;
  useOnlyAbsenceType?: boolean | null;
  displayAbsence?: boolean | null;
  cancelParentAbsence?: boolean | null;
  availableForTimecard?: boolean | null;
  isRequiredOrderNumber?: boolean | null;
}
export type DicAbsenceTypeViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "dicAbsenceType.view";
export type DicAbsenceTypeView<
  V extends DicAbsenceTypeViewName
> = V extends "_base"
  ? Pick<
      DicAbsenceType,
      | "id"
      | "langValue"
      | "description"
      | "useInSelfService"
      | "vacationDurationType"
      | "elmaTransfer"
      | "useInBalance"
      | "ignoreHolidays"
      | "isOnlyWorkingDay"
      | "timesheetCode"
      | "isWorkingDay"
      | "useOnlyAbsenceType"
      | "displayAbsence"
      | "cancelParentAbsence"
      | "availableForTimecard"
      | "isRequiredOrderNumber"
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
  : V extends "_local"
  ? Pick<
      DicAbsenceType,
      | "id"
      | "useInSelfService"
      | "vacationDurationType"
      | "elmaTransfer"
      | "useInBalance"
      | "ignoreHolidays"
      | "isOnlyWorkingDay"
      | "timesheetCode"
      | "isWorkingDay"
      | "useOnlyAbsenceType"
      | "displayAbsence"
      | "cancelParentAbsence"
      | "availableForTimecard"
      | "isRequiredOrderNumber"
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
  : V extends "_minimal"
  ? Pick<DicAbsenceType, "id" | "langValue" | "description">
  : V extends "dicAbsenceType.view"
  ? Pick<
      DicAbsenceType,
      | "id"
      | "useInSelfService"
      | "vacationDurationType"
      | "elmaTransfer"
      | "useInBalance"
      | "ignoreHolidays"
      | "isOnlyWorkingDay"
      | "timesheetCode"
      | "isWorkingDay"
      | "useOnlyAbsenceType"
      | "displayAbsence"
      | "cancelParentAbsence"
      | "availableForTimecard"
      | "isRequiredOrderNumber"
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
      | "absenceCategory"
    >
  : never;
