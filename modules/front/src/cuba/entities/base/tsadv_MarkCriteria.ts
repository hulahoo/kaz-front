import { StandardEntity } from "./sys$StandardEntity";
import { RatingScale } from "./tsadv_RatingScale";
import { Indicator } from "./tsadv_Indicator";
import { Concourse } from "./tsadv_Concourse";
export class MarkCriteria extends StandardEntity {
  static NAME = "tsadv_MarkCriteria";
  name_ru?: string | null;
  name_en?: string | null;
  ratingScale?: RatingScale | null;
  indicator?: boolean | null;
  indicator_relation?: Indicator[] | null;
  concourse?: Concourse | null;
  concourses?: Concourse[] | null;
}
export type MarkCriteriaViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "markCriteria-view";
export type MarkCriteriaView<V extends MarkCriteriaViewName> = V extends "_base"
  ? Pick<MarkCriteria, "id" | "name_ru" | "name_en" | "indicator">
  : V extends "_local"
  ? Pick<MarkCriteria, "id" | "name_ru" | "name_en" | "indicator">
  : V extends "markCriteria-view"
  ? Pick<
      MarkCriteria,
      | "id"
      | "name_ru"
      | "name_en"
      | "indicator"
      | "ratingScale"
      | "indicator_relation"
      | "concourse"
      | "concourses"
    >
  : never;
