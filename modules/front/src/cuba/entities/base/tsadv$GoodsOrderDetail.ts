import { StandardEntity } from "./sys$StandardEntity";
import { Goods } from "./tsadv$Goods";
import { GoodsOrder } from "./tsadv$GoodsOrder";
import { FileDescriptor } from "./sys$FileDescriptor";
export class GoodsOrderDetail extends StandardEntity {
  static NAME = "tsadv$GoodsOrderDetail";
  goods?: Goods | null;
  comment?: string | null;
  excluded?: boolean | null;
  quantity?: any | null;
  goodsOrder?: GoodsOrder | null;
  voucherUsed?: boolean | null;
  qrCode?: string | null;
  qrCodeImg?: FileDescriptor | null;
}
export type GoodsOrderDetailViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "goodsOrderDetail.edit"
  | "goodsOrderDetailWithVoucher";
export type GoodsOrderDetailView<
  V extends GoodsOrderDetailViewName
> = V extends "_local"
  ? Pick<
      GoodsOrderDetail,
      "id" | "comment" | "excluded" | "quantity" | "voucherUsed" | "qrCode"
    >
  : V extends "_base"
  ? Pick<
      GoodsOrderDetail,
      "id" | "comment" | "excluded" | "quantity" | "voucherUsed" | "qrCode"
    >
  : V extends "goodsOrderDetail.edit"
  ? Pick<
      GoodsOrderDetail,
      | "id"
      | "comment"
      | "excluded"
      | "quantity"
      | "voucherUsed"
      | "qrCode"
      | "goods"
    >
  : V extends "goodsOrderDetailWithVoucher"
  ? Pick<
      GoodsOrderDetail,
      | "id"
      | "comment"
      | "excluded"
      | "quantity"
      | "voucherUsed"
      | "qrCode"
      | "goods"
      | "goodsOrder"
    >
  : never;
