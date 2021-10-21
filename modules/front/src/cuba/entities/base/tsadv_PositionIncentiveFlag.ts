import { StandardEntity } from "./sys$StandardEntity";
import { PositionGroupExt } from "./base$PositionGroupExt";
export class PositionIncentiveFlag extends StandardEntity {
  static NAME = "tsadv_PositionIncentiveFlag";
  positionGroup?: PositionGroupExt | null;
  legacyId?: string | null;
  isIncentive?: boolean | null;
  dateFrom?: any | null;
  dateTo?: any | null;
}
export type PositionIncentiveFlagViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "positionIncentiveFlag.edit";
export type PositionIncentiveFlagView<
  V extends PositionIncentiveFlagViewName
> = V extends "_base"
  ? Pick<
      PositionIncentiveFlag,
      "id" | "legacyId" | "isIncentive" | "dateFrom" | "dateTo"
    >
  : V extends "_local"
  ? Pick<
      PositionIncentiveFlag,
      "id" | "legacyId" | "isIncentive" | "dateFrom" | "dateTo"
    >
  : V extends "positionIncentiveFlag.edit"
  ? Pick<
      PositionIncentiveFlag,
      | "id"
      | "legacyId"
      | "isIncentive"
      | "dateFrom"
      | "dateTo"
      | "positionGroup"
    >
  : never;
