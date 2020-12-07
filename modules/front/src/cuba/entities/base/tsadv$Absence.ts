import { AbstractParentCategorizedEntity } from "./AbstractParentCategorizedEntity";
import { FileDescriptor } from "./sys$FileDescriptor";
import { OrderGroup } from "./tsadv$OrderGroup";
import { DicAbsenceType } from "./tsadv$DicAbsenceType";
import { DicAbsenceStatus } from "./tsadv$DicAbsenceStatus";
import { OrdAssignment } from "./tsadv$OrdAssignment";
import { AbsenceRequest } from "./tsadv$AbsenceRequest";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { AbsenceToAbsenceBalance } from "./tsadv$AbsenceToAbsenceBalance";
export class Absence extends AbstractParentCategorizedEntity {
  static NAME = "tsadv$Absence";
  notificationDate?: any | null;
  file?: FileDescriptor | null;
  typeAndDate?: string | null;
  numberAndTypeAndDate?: string | null;
  parentAbsence?: Absence | null;
  orderNum?: string | null;
  orderDate?: any | null;
  vacationLink?: Absence[] | null;
  dateFrom?: any | null;
  dateTo?: any | null;
  absenceDays?: number | null;
  additionalDays?: number | null;
  order?: OrderGroup | null;
  type?: DicAbsenceType | null;
  absenceStatus?: DicAbsenceStatus | null;
  ordAssignment?: OrdAssignment | null;
  absenceRequest?: AbsenceRequest | null;
  personGroup?: PersonGroupExt | null;
  absenceToAbsenceBalance?: AbsenceToAbsenceBalance[] | null;
  legacyId?: string | null;
  periodStart?: any | null;
  periodEnd?: any | null;
  useInBalance?: boolean | null;
}
export type AbsenceViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "absence.view"
  | "absence-with-dynamic-attributes.view"
  | "absence.viewForNotify"
  | "absence.viewForNotify";
export type AbsenceView<V extends AbsenceViewName> = V extends "_minimal"
  ? Pick<
      Absence,
      | "id"
      | "absenceDays"
      | "absenceStatus"
      | "dateFrom"
      | "dateTo"
      | "notificationDate"
      | "order"
      | "type"
    >
  : V extends "_local"
  ? Pick<
      Absence,
      | "id"
      | "notificationDate"
      | "orderNum"
      | "orderDate"
      | "dateFrom"
      | "dateTo"
      | "absenceDays"
      | "additionalDays"
      | "legacyId"
      | "periodStart"
      | "periodEnd"
      | "useInBalance"
    >
  : V extends "_base"
  ? Pick<
      Absence,
      | "id"
      | "absenceDays"
      | "absenceStatus"
      | "dateFrom"
      | "dateTo"
      | "notificationDate"
      | "order"
      | "type"
      | "orderNum"
      | "orderDate"
      | "additionalDays"
      | "legacyId"
      | "periodStart"
      | "periodEnd"
      | "useInBalance"
    >
  : V extends "absence.view"
  ? Pick<
      Absence,
      | "id"
      | "notificationDate"
      | "orderNum"
      | "orderDate"
      | "dateFrom"
      | "dateTo"
      | "absenceDays"
      | "additionalDays"
      | "legacyId"
      | "periodStart"
      | "periodEnd"
      | "useInBalance"
      | "absenceRequest"
      | "personGroup"
      | "ordAssignment"
      | "type"
      | "vacationLink"
      | "typeAndDate"
      | "parentAbsence"
      | "category"
      | "file"
      | "absenceStatus"
    >
  : V extends "absence-with-dynamic-attributes.view"
  ? Pick<
      Absence,
      | "id"
      | "notificationDate"
      | "orderNum"
      | "orderDate"
      | "dateFrom"
      | "dateTo"
      | "absenceDays"
      | "additionalDays"
      | "legacyId"
      | "periodStart"
      | "periodEnd"
      | "useInBalance"
      | "personGroup"
      | "type"
      | "category"
      | "parentAbsence"
      | "file"
    >
  : V extends "absence.viewForNotify"
  ? Pick<
      Absence,
      | "id"
      | "notificationDate"
      | "orderNum"
      | "orderDate"
      | "dateFrom"
      | "dateTo"
      | "absenceDays"
      | "additionalDays"
      | "legacyId"
      | "periodStart"
      | "periodEnd"
      | "useInBalance"
      | "absenceRequest"
      | "personGroup"
      | "ordAssignment"
      | "type"
      | "vacationLink"
      | "typeAndDate"
      | "parentAbsence"
      | "category"
      | "file"
      | "absenceStatus"
      | "personGroup"
    >
  : V extends "absence.viewForNotify"
  ? Pick<
      Absence,
      | "id"
      | "notificationDate"
      | "orderNum"
      | "orderDate"
      | "dateFrom"
      | "dateTo"
      | "absenceDays"
      | "additionalDays"
      | "legacyId"
      | "periodStart"
      | "periodEnd"
      | "useInBalance"
      | "absenceRequest"
      | "personGroup"
      | "ordAssignment"
      | "type"
      | "vacationLink"
      | "typeAndDate"
      | "parentAbsence"
      | "category"
      | "file"
      | "absenceStatus"
      | "personGroup"
    >
  : never;
