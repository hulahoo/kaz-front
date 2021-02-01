import { AbstractParentEntity } from "./AbstractParentEntity";
import { Goal } from "./tsadv$Goal";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { PositionGroupExt } from "./base$PositionGroupExt";
import { JobGroup } from "./tsadv$JobGroup";
import { DicPriority } from "./tsadv$DicPriority";
import { AssignedPerformancePlan } from "./tsadv$AssignedPerformancePlan";
import { DicGoalCategory } from "./tsadv$DicGoalCategory";
import { GoalLibrary } from "./tsadv$GoalLibrary";
export class AssignedGoal extends AbstractParentEntity {
  static NAME = "tsadv$AssignedGoal";
  goal?: Goal | null;
  personGroup?: PersonGroupExt | null;
  organizationGroup?: OrganizationGroupExt | null;
  positionGroup?: PositionGroupExt | null;
  jobGroup?: JobGroup | null;
  parentGoal?: Goal | null;
  targetValue?: number | null;
  actualValue?: number | null;
  successCritetia?: string | null;
  assignedByPersonGroup?: PersonGroupExt | null;
  startDate?: any | null;
  endDate?: any | null;
  weight?: any | null;
  priority?: DicPriority | null;
  assignedPerformancePlan?: AssignedPerformancePlan | null;
  category?: DicGoalCategory | null;
  goalString?: string | null;
  goalType?: any | null;
  result?: any | null;
  parentAssignedGoal?: AssignedGoal | null;
  goalLibrary?: GoalLibrary | null;
}
export type AssignedGoalViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "assigned-goal-weight"
  | "assignedGoal-library"
  | "assignedGoal-portal-kpi-create-default"
  | "assignedGoal-view"
  | "assignedGoal.assess"
  | "assignedGoal.browse"
  | "assignedGoal.edit"
  | "assignedGoal.save"
  | "assignedGoalForCard"
  | "assignedGoalForKpi";
export type AssignedGoalView<V extends AssignedGoalViewName> = V extends "_base"
  ? Pick<
      AssignedGoal,
      | "id"
      | "goalString"
      | "targetValue"
      | "actualValue"
      | "successCritetia"
      | "startDate"
      | "endDate"
      | "weight"
      | "goalType"
      | "result"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      AssignedGoal,
      | "id"
      | "targetValue"
      | "actualValue"
      | "successCritetia"
      | "startDate"
      | "endDate"
      | "weight"
      | "goalString"
      | "goalType"
      | "result"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<AssignedGoal, "id" | "goalString">
  : V extends "assigned-goal-weight"
  ? Pick<AssignedGoal, "id" | "goalString" | "weight">
  : V extends "assignedGoal-library"
  ? Pick<AssignedGoal, "id" | "goalString" | "goal" | "weight" | "goalLibrary">
  : V extends "assignedGoal-portal-kpi-create-default"
  ? Pick<
      AssignedGoal,
      | "id"
      | "targetValue"
      | "actualValue"
      | "successCritetia"
      | "startDate"
      | "endDate"
      | "weight"
      | "goalString"
      | "goalType"
      | "result"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "category"
      | "goal"
    >
  : V extends "assignedGoal-view"
  ? Pick<
      AssignedGoal,
      | "id"
      | "goalString"
      | "goal"
      | "weight"
      | "assignedPerformancePlan"
      | "goalLibrary"
    >
  : V extends "assignedGoal.assess"
  ? Pick<AssignedGoal, "id" | "goalString" | "personGroup" | "weight">
  : V extends "assignedGoal.browse"
  ? Pick<
      AssignedGoal,
      | "id"
      | "goal"
      | "targetValue"
      | "actualValue"
      | "successCritetia"
      | "startDate"
      | "endDate"
      | "weight"
      | "personGroup"
      | "organizationGroup"
      | "positionGroup"
      | "jobGroup"
      | "assignedByPersonGroup"
      | "priority"
    >
  : V extends "assignedGoal.edit"
  ? Pick<
      AssignedGoal,
      | "id"
      | "goal"
      | "personGroup"
      | "organizationGroup"
      | "positionGroup"
      | "jobGroup"
      | "targetValue"
      | "actualValue"
      | "successCritetia"
      | "assignedByPersonGroup"
      | "startDate"
      | "endDate"
      | "weight"
      | "priority"
      | "assignedPerformancePlan"
      | "category"
      | "goalString"
      | "goalType"
      | "result"
    >
  : V extends "assignedGoal.save"
  ? Pick<
      AssignedGoal,
      | "id"
      | "targetValue"
      | "actualValue"
      | "successCritetia"
      | "startDate"
      | "endDate"
      | "weight"
      | "goalString"
      | "goalType"
      | "result"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "goal"
      | "personGroup"
      | "organizationGroup"
      | "positionGroup"
      | "jobGroup"
      | "assignedByPersonGroup"
      | "priority"
    >
  : V extends "assignedGoalForCard"
  ? Pick<
      AssignedGoal,
      | "id"
      | "targetValue"
      | "actualValue"
      | "successCritetia"
      | "startDate"
      | "endDate"
      | "weight"
      | "goalString"
      | "goalType"
      | "result"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "goal"
      | "personGroup"
    >
  : V extends "assignedGoalForKpi"
  ? Pick<
      AssignedGoal,
      | "id"
      | "targetValue"
      | "actualValue"
      | "successCritetia"
      | "startDate"
      | "endDate"
      | "weight"
      | "goalString"
      | "goalType"
      | "result"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "goal"
      | "personGroup"
      | "organizationGroup"
      | "positionGroup"
      | "jobGroup"
      | "parentGoal"
      | "assignedByPersonGroup"
      | "assignedPerformancePlan"
      | "category"
      | "parentAssignedGoal"
      | "goalLibrary"
    >
  : never;
