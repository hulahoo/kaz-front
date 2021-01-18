import { StandardEntity } from "./sys$StandardEntity";
import { GradeGroup } from "./tsadv$GradeGroup";
export class GradeSsView extends StandardEntity {
  static NAME = "tsadv$GradeSsView";
  startDate?: any | null;
  endDate?: any | null;
  gradeGroup?: GradeGroup | null;
  gradeName?: string | null;
  maxStartDate?: any | null;
}
export type GradeSsViewViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "gradeSsView-view";
export type GradeSsViewView<V extends GradeSsViewViewName> = V extends "_base"
  ? Pick<
      GradeSsView,
      "id" | "startDate" | "endDate" | "gradeName" | "maxStartDate"
    >
  : V extends "_local"
  ? Pick<
      GradeSsView,
      "id" | "startDate" | "endDate" | "gradeName" | "maxStartDate"
    >
  : V extends "gradeSsView-view"
  ? Pick<
      GradeSsView,
      | "id"
      | "startDate"
      | "endDate"
      | "gradeName"
      | "maxStartDate"
      | "gradeGroup"
    >
  : never;
