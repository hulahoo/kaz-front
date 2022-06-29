import { StandardEntity } from "./sys$StandardEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { ConcourseRequest } from "./tsadv_ConcourseRequest";
export class GradeDetail extends StandardEntity {
  static NAME = "tsadv_GradeDetail";
  comment?: string | null;
  indicatorsList?: string | null;
  ratingScaleList?: string | null;
  grade?: any | null;
  personGroup?: PersonGroupExt | null;
  concourseRequest?: ConcourseRequest | null;
}
export type GradeDetailViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "gradeDetail-view";
export type GradeDetailView<V extends GradeDetailViewName> = V extends "_base"
  ? Pick<
      GradeDetail,
      "id" | "comment" | "indicatorsList" | "ratingScaleList" | "grade"
    >
  : V extends "_local"
  ? Pick<
      GradeDetail,
      "id" | "comment" | "indicatorsList" | "ratingScaleList" | "grade"
    >
  : V extends "gradeDetail-view"
  ? Pick<
      GradeDetail,
      | "id"
      | "comment"
      | "indicatorsList"
      | "ratingScaleList"
      | "grade"
      | "personGroup"
      | "concourseRequest"
    >
  : never;
