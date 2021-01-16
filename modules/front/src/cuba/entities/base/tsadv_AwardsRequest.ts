import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicPromotionType } from "./tsadv$DicPromotionType";
import { DicAwardType } from "./tsadv$DicAwardType";
import { AssignmentGroupExt } from "./base$AssignmentGroupExt";
import { DicRequestStatus } from "./tsadv$DicRequestStatus";
export class AwardsRequest extends AbstractParentEntity {
  static NAME = "tsadv_AwardsRequest";
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
  requestStatus?: DicRequestStatus | null;
}
export type AwardsRequestViewName = "_base" | "_local" | "_minimal";
export type AwardsRequestView<
  V extends AwardsRequestViewName
> = V extends "_base"
  ? Pick<
      AwardsRequest,
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
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      AwardsRequest,
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
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
