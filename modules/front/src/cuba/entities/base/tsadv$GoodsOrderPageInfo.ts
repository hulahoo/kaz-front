import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { PageInfo } from "./tsadv$PageInfo";
import { GoodsOrderPojo } from "./tsadv$GoodsOrderPojo";
export class GoodsOrderPageInfo extends BaseUuidEntity {
  static NAME = "tsadv$GoodsOrderPageInfo";
  pageInfo?: PageInfo | null;
  goodsOrders?: GoodsOrderPojo | null;
}
export type GoodsOrderPageInfoViewName = "_minimal" | "_local" | "_base";
export type GoodsOrderPageInfoView<
  V extends GoodsOrderPageInfoViewName
> = never;
