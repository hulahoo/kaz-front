import { StandardEntity } from "./sys$StandardEntity";
import { GoodsOrder } from "./tsadv$GoodsOrder";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class GoodsOrderHistory extends StandardEntity {
  static NAME = "tsadv$GoodsOrderHistory";
  goodsOrder?: GoodsOrder | null;
  status?: any | null;
  dateTime?: any | null;
  personGroup?: PersonGroupExt | null;
}
export type GoodsOrderHistoryViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "goodsOrderHistory.browse";
export type GoodsOrderHistoryView<
  V extends GoodsOrderHistoryViewName
> = V extends "_local"
  ? Pick<GoodsOrderHistory, "id" | "status" | "dateTime">
  : V extends "_base"
  ? Pick<GoodsOrderHistory, "id" | "status" | "dateTime">
  : V extends "goodsOrderHistory.browse"
  ? Pick<
      GoodsOrderHistory,
      "id" | "status" | "dateTime" | "goodsOrder" | "personGroup"
    >
  : never;
