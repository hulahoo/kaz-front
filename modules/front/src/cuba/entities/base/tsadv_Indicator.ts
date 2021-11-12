import { StandardEntity } from "./sys$StandardEntity";
import { MarkCriteria } from "./tsadv_MarkCriteria";
import { GradeDetail } from "./tsadv_GradeDetail";
export class Indicator extends StandardEntity {
  static NAME = "tsadv_Indicator";
  name_ru?: string | null;
  name_en?: string | null;
  value?: number | null;
  markCriteria?: MarkCriteria | null;
  gradeDetail?: GradeDetail | null;
}
export type IndicatorViewName = "_base" | "_local" | "_minimal";
export type IndicatorView<V extends IndicatorViewName> = V extends "_base"
  ? Pick<Indicator, "id" | "name_ru" | "name_en" | "value">
  : V extends "_local"
  ? Pick<Indicator, "id" | "name_ru" | "name_en" | "value">
  : never;
