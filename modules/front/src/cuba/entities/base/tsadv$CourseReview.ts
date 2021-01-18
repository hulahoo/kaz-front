import { StandardEntity } from "./sys$StandardEntity";
import { Course } from "./tsadv$Course";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class CourseReview extends StandardEntity {
  static NAME = "tsadv$CourseReview";
  course?: Course | null;
  personGroup?: PersonGroupExt | null;
  rate?: any | null;
  text?: string | null;
}
export type CourseReviewViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "courseReview.browse"
  | "courseReview.rate";
export type CourseReviewView<V extends CourseReviewViewName> = V extends "_base"
  ? Pick<CourseReview, "id" | "rate" | "text">
  : V extends "_local"
  ? Pick<CourseReview, "id" | "rate" | "text">
  : V extends "courseReview.browse"
  ? Pick<CourseReview, "id" | "course" | "personGroup" | "rate" | "text">
  : V extends "courseReview.rate"
  ? Pick<CourseReview, "id" | "course" | "rate">
  : never;
