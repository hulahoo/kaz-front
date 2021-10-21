import { AbstractParentCategorizedEntity } from "./AbstractParentCategorizedEntity";
import { FileDescriptor } from "./sys$FileDescriptor";
import { OrderGroup } from "./tsadv$OrderGroup";
import { DicAbsenceType } from "./tsadv$DicAbsenceType";
import { DicAbsenceStatus } from "./tsadv$DicAbsenceStatus";
import { OrdAssignment } from "./tsadv$OrdAssignment";
import { AbsenceRequest } from "./tsadv$AbsenceRequest";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { AbsenceToAbsenceBalance } from "./tsadv$AbsenceToAbsenceBalance";
import { DicAbsencePurpose } from "./tsadv_DicAbsencePurpose";
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
  purposeText?: string | null;
  purpose?: DicAbsencePurpose | null;
  timeOfStarting?: any | null;
  timeOfFinishing?: any | null;
  totalHours?: number | null;
  compencation?: boolean | null;
  vacationDay?: boolean | null;
  acquainted?: boolean | null;
  agree?: boolean | null;
  transferPeriodStart?: any | null;
  transferPeriodEnd?: any | null;
  timeStart?: any | null;
  timeEnd?: any | null;
  additionalTime?: number | null;
}
export type AbsenceViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "absence-for-my-team"
  | "absence-view"
  | "absence-with-dynamic-attributes.view"
  | "absence.for.integration"
  | "absence.view"
  | "absence.viewForNotify";
export type AbsenceView<V extends AbsenceViewName> = V extends "_base"
  ? Pick<
      Absence,
      | "id"
      | "dateFrom"
      | "dateTo"
      | "absenceDays"
      | "absenceStatus"
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
      | "purposeText"
      | "timeOfStarting"
      | "timeOfFinishing"
      | "totalHours"
      | "compencation"
      | "vacationDay"
      | "acquainted"
      | "agree"
      | "transferPeriodStart"
      | "transferPeriodEnd"
      | "timeStart"
      | "timeEnd"
      | "additionalTime"
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
      | "purposeText"
      | "timeOfStarting"
      | "timeOfFinishing"
      | "totalHours"
      | "compencation"
      | "vacationDay"
      | "acquainted"
      | "agree"
      | "transferPeriodStart"
      | "transferPeriodEnd"
      | "timeStart"
      | "timeEnd"
      | "additionalTime"
    >
  : V extends "_minimal"
  ? Pick<
      Absence,
      | "id"
      | "dateFrom"
      | "dateTo"
      | "absenceDays"
      | "absenceStatus"
      | "notificationDate"
      | "order"
      | "type"
    >
  : V extends "absence-for-my-team"
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
      | "purposeText"
      | "timeOfStarting"
      | "timeOfFinishing"
      | "totalHours"
      | "compencation"
      | "vacationDay"
      | "acquainted"
      | "agree"
      | "transferPeriodStart"
      | "transferPeriodEnd"
      | "timeStart"
      | "timeEnd"
      | "additionalTime"
      | "order"
      | "type"
      | "absenceStatus"
      | "personGroup"
      | "purpose"
    >
  : V extends "absence-view"
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
      | "purposeText"
      | "timeOfStarting"
      | "timeOfFinishing"
      | "totalHours"
      | "compencation"
      | "vacationDay"
      | "acquainted"
      | "agree"
      | "transferPeriodStart"
      | "transferPeriodEnd"
      | "timeStart"
      | "timeEnd"
      | "additionalTime"
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
      | "purposeText"
      | "timeOfStarting"
      | "timeOfFinishing"
      | "totalHours"
      | "compencation"
      | "vacationDay"
      | "acquainted"
      | "agree"
      | "transferPeriodStart"
      | "transferPeriodEnd"
      | "timeStart"
      | "timeEnd"
      | "additionalTime"
      | "personGroup"
      | "type"
      | "category"
      | "parentAbsence"
      | "file"
    >
  : V extends "absence.for.integration"
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
      | "purposeText"
      | "timeOfStarting"
      | "timeOfFinishing"
      | "totalHours"
      | "compencation"
      | "vacationDay"
      | "acquainted"
      | "agree"
      | "transferPeriodStart"
      | "transferPeriodEnd"
      | "timeStart"
      | "timeEnd"
      | "additionalTime"
      | "order"
      | "type"
      | "absenceStatus"
      | "personGroup"
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
      | "purposeText"
      | "timeOfStarting"
      | "timeOfFinishing"
      | "totalHours"
      | "compencation"
      | "vacationDay"
      | "acquainted"
      | "agree"
      | "transferPeriodStart"
      | "transferPeriodEnd"
      | "timeStart"
      | "timeEnd"
      | "additionalTime"
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
      | "order"
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
      | "purposeText"
      | "timeOfStarting"
      | "timeOfFinishing"
      | "totalHours"
      | "compencation"
      | "vacationDay"
      | "acquainted"
      | "agree"
      | "transferPeriodStart"
      | "transferPeriodEnd"
      | "timeStart"
      | "timeEnd"
      | "additionalTime"
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
      | "order"
      | "personGroup"
    >
  : never;
