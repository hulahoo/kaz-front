import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class GoodsPojo extends BaseUuidEntity {
  static NAME = "tsadv$GoodsPojo";
  name?: string | null;
  description?: string | null;
  image?: string | null;
  category?: string | null;
  price?: any | null;
  inCart?: number | null;
  inWishList?: number | null;
  quantity?: any | null;
  cartId?: any | null;
}
export type GoodsPojoViewName = "_minimal" | "_local" | "_base";
export type GoodsPojoView<V extends GoodsPojoViewName> = never;
