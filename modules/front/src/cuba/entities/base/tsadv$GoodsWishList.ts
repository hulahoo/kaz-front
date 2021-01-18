import { StandardEntity } from "./sys$StandardEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { Goods } from "./tsadv$Goods";
export class GoodsWishList extends StandardEntity {
  static NAME = "tsadv$GoodsWishList";
  personGroup?: PersonGroupExt | null;
  goods?: Goods | null;
}
export type GoodsWishListViewName = "_base" | "_local" | "_minimal";
export type GoodsWishListView<V extends GoodsWishListViewName> = never;
