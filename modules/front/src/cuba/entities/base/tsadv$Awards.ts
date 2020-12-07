import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicPromotionType } from "./tsadv$DicPromotionType";
import { DicAwardType } from "./tsadv$DicAwardType";
import { AssignmentGroupExt } from "./base$AssignmentGroupExt";
export class Awards extends AbstractParentEntity {
  static NAME = "tsadv$Awards";
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
}
export type AwardsViewName = "_minimal" | "_local" | "_base" | "awards.all";
export type AwardsView<V extends AwardsViewName> = V extends "_local"
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
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
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
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "promotionType"
      | "awardType"
      | "assignmentGroup"
    >
  : never;
