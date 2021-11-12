import { StandardEntity } from "./sys$StandardEntity";
import { Levels } from "./tsadv_Levels";
import { GradeDetail } from "./tsadv_GradeDetail";
export class RatingScale extends StandardEntity {
  static NAME = "tsadv_RatingScale";
  name_ru?: string | null;
  name_en?: string | null;
  level_relation?: Levels[] | null;
  gradeDetail?: GradeDetail | null;
}
export type RatingScaleViewName = "_base" | "_local" | "_minimal";
export type RatingScaleView<V extends RatingScaleViewName> = V extends "_base"
  ? Pick<RatingScale, "id" | "name_en" | "name_ru">
  : V extends "_local"
  ? Pick<RatingScale, "id" | "name_ru" | "name_en">
  : V extends "_minimal"
  ? Pick<RatingScale, "id" | "name_en" | "name_ru">
  : never;
