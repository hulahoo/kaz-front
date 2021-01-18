import { StandardEntity } from "./sys$StandardEntity";
import { Goods } from "./tsadv$Goods";
export class GoodsReceipt extends StandardEntity {
  static NAME = "tsadv$GoodsReceipt";
  goods?: Goods | null;
  quantity?: any | null;
}
export type GoodsReceiptViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "goodsReceipt.edit";
export type GoodsReceiptView<V extends GoodsReceiptViewName> = V extends "_base"
  ? Pick<GoodsReceipt, "id" | "quantity">
  : V extends "_local"
  ? Pick<GoodsReceipt, "id" | "quantity">
  : V extends "goodsReceipt.edit"
  ? Pick<GoodsReceipt, "id" | "quantity" | "goods">
  : never;
