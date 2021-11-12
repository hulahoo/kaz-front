import { StandardEntity } from "./sys$StandardEntity";
import { Indicator } from "./tsadv_Indicator";
import { RatingScale } from "./tsadv_RatingScale";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { ConcourseRequest } from "./tsadv_ConcourseRequest";
export class GradeDetail extends StandardEntity {
  static NAME = "tsadv_GradeDetail";
  comment?: string | null;
  indicatorsList?: Indicator[] | null;
  ratingScaleList?: RatingScale[] | null;
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
  ? Pick<GradeDetail, "id" | "comment" | "grade">
  : V extends "_local"
  ? Pick<GradeDetail, "id" | "comment" | "grade">
  : V extends "gradeDetail-view"
  ? Pick<
      GradeDetail,
      | "id"
      | "comment"
      | "grade"
      | "personGroup"
      | "concourseRequest"
      | "indicatorsList"
      | "ratingScaleList"
    >
  : never;
