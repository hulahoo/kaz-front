import { StandardEntity } from "./sys$StandardEntity";
import { Goods } from "./tsadv$Goods";
import { FileDescriptor } from "./sys$FileDescriptor";
export class GoodsImage extends StandardEntity {
  static NAME = "tsadv$GoodsImage";
  good?: Goods | null;
  primary?: boolean | null;
  image?: FileDescriptor | null;
}
export type GoodsImageViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "goodsImage.edit";
export type GoodsImageView<V extends GoodsImageViewName> = V extends "_local"
  ? Pick<GoodsImage, "id" | "primary">
  : V extends "_base"
  ? Pick<GoodsImage, "id" | "primary">
  : V extends "goodsImage.edit"
  ? Pick<GoodsImage, "id" | "primary" | "image">
  : never;
