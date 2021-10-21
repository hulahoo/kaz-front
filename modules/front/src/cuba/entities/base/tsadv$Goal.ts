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
  parentGoal?: Goal | null;
  goalNameLang2?: string | null;
  goalNameLang3?: string | null;
  successCriteriaLang2?: string | null;
  successCriteriaLang3?: string | null;
  goalLang?: string | null;
  successCriteriaLang?: string | null;
}
export type GoalViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "assigned-goal-cascade-position-group"
  | "goal.browse"
  | "goal.edit"
  | "goal.with.successCriteriaLang";
export type GoalView<V extends GoalViewName> = V extends "_base"
  ? Pick<
      Goal,
      | "id"
      | "goalLang"
      | "goalName"
      | "successCriteria"
      | "startDate"
      | "endDate"
      | "goalNameLang2"
      | "goalNameLang3"
      | "successCriteriaLang2"
      | "successCriteriaLang3"
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
      | "goalNameLang2"
      | "goalNameLang3"
      | "successCriteriaLang2"
      | "successCriteriaLang3"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<Goal, "id" | "goalLang">
  : V extends "assigned-goal-cascade-position-group"
  ? Pick<
      Goal,
      "id" | "goalLang" | "library" | "successCriteria" | "successCriteriaLang"
    >
  : V extends "goal.browse"
  ? Pick<
      Goal,
      | "id"
      | "goalName"
      | "successCriteria"
      | "startDate"
      | "endDate"
      | "goalNameLang2"
      | "goalNameLang3"
      | "successCriteriaLang2"
      | "successCriteriaLang3"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "library"
      | "measureType"
      | "uom"
      | "parentGoal"
    >
  : V extends "goal.edit"
  ? Pick<
      Goal,
      | "id"
      | "goalName"
      | "successCriteria"
      | "library"
      | "measureType"
      | "uom"
      | "startDate"
      | "endDate"
      | "parentGoal"
      | "goalNameLang2"
      | "goalNameLang3"
      | "successCriteriaLang2"
      | "successCriteriaLang3"
    >
  : V extends "goal.with.successCriteriaLang"
  ? Pick<
      Goal,
      | "id"
      | "goalName"
      | "successCriteria"
      | "startDate"
      | "endDate"
      | "goalNameLang2"
      | "goalNameLang3"
      | "successCriteriaLang2"
      | "successCriteriaLang3"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "successCriteriaLang"
    >
  : never;
