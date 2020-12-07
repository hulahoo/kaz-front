import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { PageInfo } from "./tsadv$PageInfo";
import { GoodsPojo } from "./tsadv$GoodsPojo";
export class GoodsPageInfo extends BaseUuidEntity {
  static NAME = "tsadv$GoodsPageInfo";
  pageInfo?: PageInfo | null;
  goods?: GoodsPojo | null;
}
export type GoodsPageInfoViewName = "_minimal" | "_local" | "_base";
export type GoodsPageInfoView<V extends GoodsPageInfoViewName> = never;
