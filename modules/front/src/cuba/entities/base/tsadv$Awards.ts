import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicPromotionType } from "./tsadv$DicPromotionType";
import { DicAwardType } from "./tsadv$DicAwardType";
import { AssignmentGroupExt } from "./base$AssignmentGroupExt";
export class Awards extends AbstractParentEntity {
  static NAME = "tsadv$Awards";
  personGroup?: PersonGroupExt | null;
  promotionType?: DicPromotionType | null;
  calculated?: string | null;
  surChargeType?: any | null;
  value?: number | null;
  awardType?: DicAwardType | null;
  date?: any | null;
  orderNum?: string | null;
  orderDate?: any | null;
  assignmentGroup?: AssignmentGroupExt | null;
  reason?: string | null;
  startDate?: any | null;
  note?: string | null;
  startDateHistory?: any | null;
  endDateHistory?: any | null;
}
export type AwardsViewName = "_base" | "_local" | "_minimal" | "awards.all";
export type AwardsView<V extends AwardsViewName> = V extends "_base"
  ? Pick<
      Awards,
      | "id"
      | "calculated"
      | "surChargeType"
      | "value"
      | "date"
      | "orderNum"
      | "orderDate"
      | "reason"
      | "startDate"
      | "note"
      | "startDateHistory"
      | "endDateHistory"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Awards,
      | "id"
      | "calculated"
      | "surChargeType"
      | "value"
      | "date"
      | "orderNum"
      | "orderDate"
      | "reason"
      | "startDate"
      | "note"
      | "startDateHistory"
      | "endDateHistory"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "awards.all"
  ? Pick<
      Awards,
      | "id"
      | "calculated"
      | "surChargeType"
      | "value"
      | "date"
      | "orderNum"
      | "orderDate"
      | "reason"
      | "startDate"
      | "note"
      | "startDateHistory"
      | "endDateHistory"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "promotionType"
      | "awardType"
      | "assignmentGroup"
    >
  : never;
