import { StandardEntity } from "./sys$StandardEntity";
import { DicIncentiveIndicators } from "./tsadv_DicIncentiveIndicators";
export class DicIncentiveIndicatorScoreSetting extends StandardEntity {
  static NAME = "tsadv_DicIncentiveIndicatorScoreSetting";
  indicator?: DicIncentiveIndicators | null;
  minPercent?: any | null;
  maxPercent?: any | null;
  totalScore?: any | null;
}
export type DicIncentiveIndicatorScoreSettingViewName =
  | "_base"
  | "_local"
  | "_minimal";
export type DicIncentiveIndicatorScoreSettingView<
  V extends DicIncentiveIndicatorScoreSettingViewName
> = V extends "_base"
  ? Pick<
      DicIncentiveIndicatorScoreSetting,
      "id" | "minPercent" | "maxPercent" | "totalScore"
    >
  : V extends "_local"
  ? Pick<
      DicIncentiveIndicatorScoreSetting,
      "id" | "minPercent" | "maxPercent" | "totalScore"
    >
  : never;
