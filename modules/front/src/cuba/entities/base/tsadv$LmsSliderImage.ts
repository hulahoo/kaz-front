import { StandardEntity } from "./sys$StandardEntity";
import { FileDescriptor } from "./sys$FileDescriptor";
import { LmsSlider } from "./tsadv$LmsSlider";
export class LmsSliderImage extends StandardEntity {
  static NAME = "tsadv$LmsSliderImage";
  image?: FileDescriptor | null;
  url?: string | null;
  order?: number | null;
  slider?: LmsSlider | null;
}
export type LmsSliderImageViewName = "_base" | "_local" | "_minimal";
export type LmsSliderImageView<
  V extends LmsSliderImageViewName
> = V extends "_base"
  ? Pick<LmsSliderImage, "id" | "url" | "order">
  : V extends "_local"
  ? Pick<LmsSliderImage, "id" | "url" | "order">
  : never;
