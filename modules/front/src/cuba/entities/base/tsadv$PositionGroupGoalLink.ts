import { AbstractParentEntity } from "./AbstractParentEntity";
import { PositionGroupExt } from "./base$PositionGroupExt";
import { Goal } from "./tsadv$Goal";
export class PositionGroupGoalLink extends AbstractParentEntity {
  static NAME = "tsadv$PositionGroupGoalLink";
  weight?: number | null;
  targetValue?: number | null;
  positionGroup?: PositionGroupExt | null;
  goal?: Goal | null;
}
export type PositionGroupGoalLinkViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "positionGroupGoalLink.edit";
export type PositionGroupGoalLinkView<
  V extends PositionGroupGoalLinkViewName
> = V extends "_local"
  ? Pick<
      PositionGroupGoalLink,
      | "id"
      | "weight"
      | "targetValue"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      PositionGroupGoalLink,
      | "id"
      | "weight"
      | "targetValue"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "positionGroupGoalLink.edit"
  ? Pick<
      PositionGroupGoalLink,
      | "id"
      | "weight"
      | "targetValue"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "positionGroup"
      | "goal"
    >
  : never;
