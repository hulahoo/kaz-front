import { StandardEntity } from "./sys$StandardEntity";
import { RatingScale } from "./tsadv_RatingScale";
export class Levels extends StandardEntity {
  static NAME = "tsadv_Levels";
  name_ru?: string | null;
  name_en?: string | null;
  number?: number | null;
  ratingScale?: RatingScale | null;
}
export type LevelsViewName = "_base" | "_local" | "_minimal";
export type LevelsView<V extends LevelsViewName> = V extends "_base"
  ? Pick<Levels, "id" | "name_en" | "name_ru" | "number">
  : V extends "_local"
  ? Pick<Levels, "id" | "name_ru" | "name_en" | "number">
  : V extends "_minimal"
  ? Pick<Levels, "id" | "name_en" | "name_ru" | "number">
  : never;
