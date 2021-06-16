import { StandardEntity } from "./sys$StandardEntity";
export class ImageSize extends StandardEntity {
  static NAME = "tsadv_ImageSize";
  width?: number | null;
  height?: number | null;
}
export type ImageSizeViewName = "_base" | "_local" | "_minimal";
export type ImageSizeView<V extends ImageSizeViewName> = V extends "_base"
  ? Pick<ImageSize, "id" | "width" | "height">
  : V extends "_local"
  ? Pick<ImageSize, "id" | "width" | "height">
  : never;
