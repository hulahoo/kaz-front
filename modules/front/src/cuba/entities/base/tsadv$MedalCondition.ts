import { StandardEntity } from "./sys$StandardEntity";
import { Medal } from "./tsadv$Medal";
import { DicQuality } from "./tsadv$DicQuality";
export class MedalCondition extends StandardEntity {
  static NAME = "tsadv$MedalCondition";
  medal?: Medal | null;
  quality?: DicQuality | null;
  qualityQuantity?: any | null;
  childMedal?: Medal | null;
  medalQuantity?: any | null;
}
export type MedalConditionViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "medalCondition.edit";
export type MedalConditionView<
  V extends MedalConditionViewName
> = V extends "_local"
  ? Pick<MedalCondition, "id" | "qualityQuantity" | "medalQuantity">
  : V extends "_base"
  ? Pick<MedalCondition, "id" | "qualityQuantity" | "medalQuantity">
  : V extends "medalCondition.edit"
  ? Pick<
      MedalCondition,
      | "id"
      | "qualityQuantity"
      | "medalQuantity"
      | "medal"
      | "quality"
      | "childMedal"
    >
  : never;
