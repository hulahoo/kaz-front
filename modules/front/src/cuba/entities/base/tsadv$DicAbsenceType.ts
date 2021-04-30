import { AbstractDictionary } from "./AbstractDictionary";
import { DicAbsenceCategory } from "./tsadv$DicAbsenceCategory";
export class DicAbsenceType extends AbstractDictionary {
  static NAME = "tsadv$DicAbsenceType";
  useInSelfService?: boolean | null;
  availableToManager?: boolean | null;
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
  includeCalcGzp?: boolean | null;
  maxDay?: number | null;
  minDay?: number | null;
  daysAdvance?: number | null;
  daysBeforeAbsence?: number | null;
  manyDays?: number | null;
  availableForRecallAbsence?: boolean | null;
  availableForChangeDate?: boolean | null;
  availableForLeavingVacation?: boolean | null;
  isJustRequired?: boolean | null;
  isOriginalSheet?: boolean | null;
  isCheckWork?: boolean | null;
  isVacationDate?: boolean | null;
  workOnWeekend?: boolean | null;
  temporaryTransfer?: boolean | null;
  overtimeWork?: boolean | null;
  numDaysCalendarYear?: number | null;
  isEcologicalAbsence?: number | null;
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
      | "availableToManager"
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
      | "includeCalcGzp"
      | "maxDay"
      | "minDay"
      | "daysAdvance"
      | "daysBeforeAbsence"
      | "manyDays"
      | "availableForRecallAbsence"
      | "availableForChangeDate"
      | "availableForLeavingVacation"
      | "isJustRequired"
      | "isOriginalSheet"
      | "isCheckWork"
      | "isVacationDate"
      | "workOnWeekend"
      | "temporaryTransfer"
      | "overtimeWork"
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
      | "numDaysCalendarYear"
      | "isEcologicalAbsence"
    >
  : V extends "_local"
  ? Pick<
      DicAbsenceType,
      | "id"
      | "useInSelfService"
      | "availableToManager"
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
      | "includeCalcGzp"
      | "maxDay"
      | "minDay"
      | "daysAdvance"
      | "daysBeforeAbsence"
      | "manyDays"
      | "availableForRecallAbsence"
      | "availableForChangeDate"
      | "availableForLeavingVacation"
      | "isJustRequired"
      | "isOriginalSheet"
      | "isCheckWork"
      | "isVacationDate"
      | "workOnWeekend"
      | "temporaryTransfer"
      | "overtimeWork"
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
      | "numDaysCalendarYear"
      | "isEcologicalAbsence"
    >
  : V extends "_minimal"
  ? Pick<DicAbsenceType, "id" | "langValue" | "description">
  : V extends "dicAbsenceType.view"
  ? Pick<
      DicAbsenceType,
      | "id"
      | "useInSelfService"
      | "availableToManager"
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
      | "includeCalcGzp"
      | "maxDay"
      | "minDay"
      | "daysAdvance"
      | "daysBeforeAbsence"
      | "manyDays"
      | "availableForRecallAbsence"
      | "availableForChangeDate"
      | "availableForLeavingVacation"
      | "isJustRequired"
      | "isOriginalSheet"
      | "isCheckWork"
      | "isVacationDate"
      | "workOnWeekend"
      | "temporaryTransfer"
      | "overtimeWork"
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
      | "company"
      | "numDaysCalendarYear"
      | "isEcologicalAbsence"
    >
  : never;
