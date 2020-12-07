import { StandardEntity } from "./sys$StandardEntity";
import { FileDescriptor } from "./sys$FileDescriptor";
import { LmsSlider } from "./tsadv$LmsSlider";
export class LmsSliderImage extends StandardEntity {
  static NAME = "tsadv$LmsSliderImage";
  image?: FileDescriptor | null;
  order?: number | null;
  slider?: LmsSlider | null;
}
export type LmsSliderImageViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "lmsSliderImage.with.image";
export type LmsSliderImageView<
  V extends LmsSliderImageViewName
> = V extends "_local"
  ? Pick<LmsSliderImage, "id" | "order">
  : V extends "_base"
  ? Pick<LmsSliderImage, "id" | "order">
  : V extends "lmsSliderImage.with.image"
  ? Pick<LmsSliderImage, "id" | "order" | "image">
  : never;
