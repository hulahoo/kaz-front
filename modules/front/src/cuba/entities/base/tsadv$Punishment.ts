import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicLCArticle } from "./tsadv$DicLCArticle";
import { DicPunishmentTypes } from "./tsadv$DicPunishmentTypes";
import { DicOffenceType } from "./tsadv$DicOffenceType";
import { DicAdditionalEducation } from "./tsadv$DicAdditionalEducation";
import { DicExamResults } from "./tsadv$DicExamResults";
import { DicAcceptedAction } from "./tsadv$DicAcceptedAction";
import { AssignmentGroupExt } from "./base$AssignmentGroupExt";
export class Punishment extends AbstractParentEntity {
  static NAME = "tsadv$Punishment";
  date?: any | null;
  accidentCause?: string | null;
  responsibleEmployee?: PersonGroupExt | null;
  notifyEmployees?: boolean | null;
  lawArticle?: DicLCArticle | null;
  earlyTerminationReason?: string | null;
  type?: DicPunishmentTypes | null;
  accident?: string | null;
  offenceType?: DicOffenceType | null;
  reason?: string | null;
  isSafetyEngineering?: boolean | null;
  period?: any | null;
  orderNumber?: string | null;
  orderDate?: any | null;
  depression?: number | null;
  ledToAccident?: boolean | null;
  additionalEducation?: DicAdditionalEducation | null;
  examResults?: DicExamResults | null;
  acceptedAction?: DicAcceptedAction | null;
  removingDate?: any | null;
  removingOrderNum?: string | null;
  removingOrderDate?: any | null;
  assignmentGroup?: AssignmentGroupExt | null;
}
export type PunishmentViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "punishment.all";
export type PunishmentView<V extends PunishmentViewName> = V extends "_base"
  ? Pick<
      Punishment,
      | "id"
      | "date"
      | "accidentCause"
      | "notifyEmployees"
      | "earlyTerminationReason"
      | "accident"
      | "reason"
      | "isSafetyEngineering"
      | "period"
      | "orderNumber"
      | "orderDate"
      | "depression"
      | "ledToAccident"
      | "removingDate"
      | "removingOrderNum"
      | "removingOrderDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Punishment,
      | "id"
      | "date"
      | "accidentCause"
      | "notifyEmployees"
      | "earlyTerminationReason"
      | "accident"
      | "reason"
      | "isSafetyEngineering"
      | "period"
      | "orderNumber"
      | "orderDate"
      | "depression"
      | "ledToAccident"
      | "removingDate"
      | "removingOrderNum"
      | "removingOrderDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "punishment.all"
  ? Pick<
      Punishment,
      | "id"
      | "date"
      | "accidentCause"
      | "notifyEmployees"
      | "earlyTerminationReason"
      | "accident"
      | "reason"
      | "isSafetyEngineering"
      | "period"
      | "orderNumber"
      | "orderDate"
      | "depression"
      | "ledToAccident"
      | "removingDate"
      | "removingOrderNum"
      | "removingOrderDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "type"
      | "offenceType"
      | "additionalEducation"
      | "examResults"
      | "acceptedAction"
      | "lawArticle"
      | "responsibleEmployee"
    >
  : never;
