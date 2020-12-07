import { StandardEntity } from "./sys$StandardEntity";
export class DivisionElementsToGoal extends StandardEntity {
  static NAME = "tsadv$DivisionElementsToGoal";
}
export type DivisionElementsToGoalViewName = "_minimal" | "_local" | "_base";
export type DivisionElementsToGoalView<
  V extends DivisionElementsToGoalViewName
> = never;
