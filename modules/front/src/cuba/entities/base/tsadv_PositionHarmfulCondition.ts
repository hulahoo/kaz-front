import { StandardEntity } from "./sys$StandardEntity";
import { PositionGroupExt } from "./base$PositionGroupExt";
export class PositionHarmfulCondition extends StandardEntity {
  static NAME = "tsadv_PositionHarmfulCondition";
  legacyId?: string | null;
  positionGroup?: PositionGroupExt | null;
  endDate?: any | null;
  days?: number | null;
  startDate?: any | null;
}
export type PositionHarmfulConditionViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "positionHarmfulCondition.edit";
export type PositionHarmfulConditionView<
  V extends PositionHarmfulConditionViewName
> = V extends "_base"
  ? Pick<
      PositionHarmfulCondition,
      "id" | "legacyId" | "endDate" | "days" | "startDate"
    >
  : V extends "_local"
  ? Pick<
      PositionHarmfulCondition,
      "id" | "legacyId" | "endDate" | "days" | "startDate"
    >
  : V extends "positionHarmfulCondition.edit"
  ? Pick<
      PositionHarmfulCondition,
      "id" | "legacyId" | "endDate" | "days" | "startDate" | "positionGroup"
    >
  : never;
