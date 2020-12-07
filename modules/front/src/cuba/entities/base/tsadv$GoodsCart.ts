import { StandardEntity } from "./sys$StandardEntity";
import { Goods } from "./tsadv$Goods";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class GoodsCart extends StandardEntity {
  static NAME = "tsadv$GoodsCart";
  goods?: Goods | null;
  issued?: boolean | null;
  personGroup?: PersonGroupExt | null;
  quantity?: any | null;
}
export type GoodsCartViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "goodsCart.add"
  | "goodsCart.checkout";
export type GoodsCartView<V extends GoodsCartViewName> = V extends "_local"
  ? Pick<GoodsCart, "id" | "issued" | "quantity">
  : V extends "_base"
  ? Pick<GoodsCart, "id" | "issued" | "quantity">
  : V extends "goodsCart.add"
  ? Pick<GoodsCart, "id" | "issued" | "quantity" | "goods">
  : V extends "goodsCart.checkout"
  ? Pick<GoodsCart, "id" | "issued" | "quantity" | "goods">
  : never;
