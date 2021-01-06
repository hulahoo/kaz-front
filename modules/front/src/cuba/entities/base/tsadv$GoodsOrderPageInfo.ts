import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { PageInfo } from "./tsadv$PageInfo";
import { GoodsOrderPojo } from "./tsadv$GoodsOrderPojo";
export class GoodsOrderPageInfo extends BaseUuidEntity {
  static NAME = "tsadv$GoodsOrderPageInfo";
  pageInfo?: PageInfo | null;
  goodsOrders?: GoodsOrderPojo | null;
}
export type GoodsOrderPageInfoViewName = "_base" | "_local" | "_minimal";
export type GoodsOrderPageInfoView<
  V extends GoodsOrderPageInfoViewName
> = never;
