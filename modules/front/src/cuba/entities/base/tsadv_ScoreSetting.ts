import { StandardEntity } from "./sys$StandardEntity";
import { PerformancePlan } from "./tsadv$PerformancePlan";
export class ScoreSetting extends StandardEntity {
  static NAME = "tsadv_ScoreSetting";
  performancePlan?: PerformancePlan | null;
  minPercent?: any | null;
  maxPercent?: any | null;
  finalScore?: number | null;
}
export type ScoreSettingViewName = "_base" | "_local" | "_minimal";
export type ScoreSettingView<V extends ScoreSettingViewName> = V extends "_base"
  ? Pick<ScoreSetting, "id" | "minPercent" | "maxPercent" | "finalScore">
  : V extends "_local"
  ? Pick<ScoreSetting, "id" | "minPercent" | "maxPercent" | "finalScore">
  : never;
