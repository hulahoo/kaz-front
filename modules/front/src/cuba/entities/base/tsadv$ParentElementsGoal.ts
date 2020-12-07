import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class ParentElementsGoal extends BaseUuidEntity {
  static NAME = "tsadv$ParentElementsGoal";
  elementType?: any | null;
  elementName?: string | null;
  goalName?: string | null;
  goalWeight?: number | null;
}
export type ParentElementsGoalViewName = "_minimal" | "_local" | "_base";
export type ParentElementsGoalView<
  V extends ParentElementsGoalViewName
> = never;
