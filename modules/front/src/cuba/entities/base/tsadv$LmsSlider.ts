import { StandardEntity } from "./sys$StandardEntity";
import { DicLmsSliderPosition } from "./tsadv_DicLmsSliderPosition";
import { LmsSliderImage } from "./tsadv$LmsSliderImage";
export class LmsSlider extends StandardEntity {
  static NAME = "tsadv$LmsSlider";
  position?: DicLmsSliderPosition | null;
  images?: LmsSliderImage[] | null;
}
export type LmsSliderViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "lmsSlider.with.images";
export type LmsSliderView<V extends LmsSliderViewName> = V extends "_base"
  ? Pick<LmsSlider, "id" | "position">
  : V extends "_minimal"
  ? Pick<LmsSlider, "id" | "position">
  : V extends "lmsSlider.with.images"
  ? Pick<LmsSlider, "id" | "position" | "images">
  : never;
