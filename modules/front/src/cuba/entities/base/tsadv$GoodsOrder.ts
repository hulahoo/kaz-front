import { StandardEntity } from "./sys$StandardEntity";
import { DicDeliveryAddress } from "./tsadv$DicDeliveryAddress";
import { GoodsOrderHistory } from "./tsadv$GoodsOrderHistory";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { GoodsOrderDetail } from "./tsadv$GoodsOrderDetail";
export class GoodsOrder extends StandardEntity {
  static NAME = "tsadv$GoodsOrder";
  status?: any | null;
  deliveryAddress?: DicDeliveryAddress | null;
  discount?: number | null;
  histories?: GoodsOrderHistory[] | null;
  totalSum?: any | null;
  orderNumber?: string | null;
  orderDate?: any | null;
  personGroup?: PersonGroupExt | null;
  details?: GoodsOrderDetail[] | null;
}
export type GoodsOrderViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "goodsOrder.edit"
  | "goodsOrder.browse"
  | "goodsOrder.for.integration";
export type GoodsOrderView<V extends GoodsOrderViewName> = V extends "_minimal"
  ? Pick<GoodsOrder, "id" | "orderNumber">
  : V extends "_local"
  ? Pick<
      GoodsOrder,
      "id" | "status" | "discount" | "totalSum" | "orderNumber" | "orderDate"
    >
  : V extends "_base"
  ? Pick<
      GoodsOrder,
      "id" | "orderNumber" | "status" | "discount" | "totalSum" | "orderDate"
    >
  : V extends "goodsOrder.edit"
  ? Pick<
      GoodsOrder,
      | "id"
      | "status"
      | "discount"
      | "totalSum"
      | "orderNumber"
      | "orderDate"
      | "personGroup"
      | "details"
      | "deliveryAddress"
    >
  : V extends "goodsOrder.browse"
  ? Pick<
      GoodsOrder,
      | "id"
      | "status"
      | "discount"
      | "totalSum"
      | "orderNumber"
      | "orderDate"
      | "personGroup"
    >
  : V extends "goodsOrder.for.integration"
  ? Pick<
      GoodsOrder,
      | "id"
      | "status"
      | "discount"
      | "totalSum"
      | "orderNumber"
      | "orderDate"
      | "deliveryAddress"
      | "details"
    >
  : never;
