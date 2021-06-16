import { StandardEntity } from "./sys$StandardEntity";
import { ImageSize } from "./tsadv_ImageSize";
import { FileDescriptor } from "./sys$FileDescriptor";
export class ResizedImage extends StandardEntity {
  static NAME = "tsadv_ResizedImage";
  size?: ImageSize | null;
  originalImage?: FileDescriptor | null;
  resizedImage?: FileDescriptor | null;
}
export type ResizedImageViewName = "_base" | "_local" | "_minimal";
export type ResizedImageView<V extends ResizedImageViewName> = never;
