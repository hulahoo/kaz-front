import { StandardEntity } from "./sys$StandardEntity";
import { Goods } from "./tsadv$Goods";
import { FileDescriptor } from "./sys$FileDescriptor";
export class GoodsImageForReport extends StandardEntity {
  static NAME = "tsadv$GoodsImageForReport";
  good?: Goods | null;
  primary?: boolean | null;
  image?: FileDescriptor | null;
}
export type GoodsImageForReportViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "goodsImageForReport.edit";
export type GoodsImageForReportView<
  V extends GoodsImageForReportViewName
> = V extends "_local"
  ? Pick<GoodsImageForReport, "id" | "primary">
  : V extends "_base"
  ? Pick<GoodsImageForReport, "id" | "primary">
  : V extends "goodsImageForReport.edit"
  ? Pick<GoodsImageForReport, "id" | "primary" | "image">
  : never;
