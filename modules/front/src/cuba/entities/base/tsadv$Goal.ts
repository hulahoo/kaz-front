import { AbstractParentEntity } from "./AbstractParentEntity";
import { GoalLibrary } from "./tsadv$GoalLibrary";
import { DicMeasureType } from "./tsadv$DicMeasureType";
import { DicUOM } from "./tsadv$DicUOM";
export class Goal extends AbstractParentEntity {
  static NAME = "tsadv$Goal";
  goalName?: string | null;
  successCriteria?: string | null;
  library?: GoalLibrary | null;
  measureType?: DicMeasureType | null;
  uom?: DicUOM | null;
  startDate?: any | null;
  endDate?: any | null;
}
export type GoalViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "goal.browse"
  | "goal.edit";
export type GoalView<V extends GoalViewName> = V extends "_base"
  ? Pick<
      Goal,
      | "id"
      | "goalName"
      | "successCriteria"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Goal,
      | "id"
      | "goalName"
      | "successCriteria"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<Goal, "id" | "goalName">
  : V extends "goal.browse"
  ? Pick<
      Goal,
      | "id"
      | "goalName"
      | "successCriteria"
      | "measureType"
      | "uom"
      | "startDate"
      | "endDate"
      | "library"
    >
  : V extends "goal.edit"
  ? Pick<
      Goal,
      | "id"
      | "goalName"
      | "successCriteria"
      | "measureType"
      | "uom"
      | "startDate"
      | "endDate"
      | "library"
    >
  : never;
