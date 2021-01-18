import { AbstractParentEntity } from "./AbstractParentEntity";
import { SurChargeName } from "./tsadv$SurChargeName";
import { DicCurrency } from "./base$DicCurrency";
import { PositionGroupExt } from "./base$PositionGroupExt";
import { AssignmentGroupExt } from "./base$AssignmentGroupExt";
export class SurCharge extends AbstractParentEntity {
  static NAME = "tsadv$SurCharge";
  name?: SurChargeName | null;
  currency?: DicCurrency | null;
  reason?: string | null;
  grossNet?: any | null;
  period?: any | null;
  type?: any | null;
  dateFrom?: any | null;
  dateTo?: any | null;
  positionGroup?: PositionGroupExt | null;
  assignmentGroup?: AssignmentGroupExt | null;
  value?: any | null;
  calculate?: string | null;
}
export type SurChargeViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "surCharge.browse"
  | "surCharge.card";
export type SurChargeView<V extends SurChargeViewName> = V extends "_base"
  ? Pick<
      SurCharge,
      | "id"
      | "reason"
      | "grossNet"
      | "period"
      | "type"
      | "dateFrom"
      | "dateTo"
      | "value"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      SurCharge,
      | "id"
      | "reason"
      | "grossNet"
      | "period"
      | "type"
      | "dateFrom"
      | "dateTo"
      | "value"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "surCharge.browse"
  ? Pick<
      SurCharge,
      | "id"
      | "reason"
      | "grossNet"
      | "period"
      | "type"
      | "dateFrom"
      | "dateTo"
      | "value"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "name"
      | "assignmentGroup"
      | "currency"
    >
  : V extends "surCharge.card"
  ? Pick<
      SurCharge,
      | "id"
      | "reason"
      | "grossNet"
      | "period"
      | "type"
      | "dateFrom"
      | "dateTo"
      | "value"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "name"
      | "updatedBy"
      | "currency"
    >
  : never;
