import { StandardEntity } from "./sys$StandardEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { Concourse } from "./tsadv_Concourse";
export class GradeDetail extends StandardEntity {
  static NAME = "tsadv_GradeDetail";
  comment?: string | null;
  grade?: any | null;
  personGroup?: PersonGroupExt | null;
  concourse?: Concourse | null;
}
export type GradeDetailViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "gradeDetail-view";
export type GradeDetailView<V extends GradeDetailViewName> = V extends "_base"
  ? Pick<GradeDetail, "id" | "comment" | "grade">
  : V extends "_local"
  ? Pick<GradeDetail, "id" | "comment" | "grade">
  : V extends "gradeDetail-view"
  ? Pick<GradeDetail, "id" | "comment" | "grade" | "personGroup">
  : never;
