import { AbstractParentEntity } from "./AbstractParentEntity";
import { Goods } from "./tsadv$Goods";
export class GoodsWarehouse extends AbstractParentEntity {
  static NAME = "tsadv$GoodsWarehouse";
  goods?: Goods | null;
  quantity?: any | null;
}
export type GoodsWarehouseViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "goodsWarehouse.edit";
export type GoodsWarehouseView<
  V extends GoodsWarehouseViewName
> = V extends "_local"
  ? Pick<
      GoodsWarehouse,
      | "id"
      | "quantity"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      GoodsWarehouse,
      | "id"
      | "quantity"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "goodsWarehouse.edit"
  ? Pick<
      GoodsWarehouse,
      | "id"
      | "quantity"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "goods"
    >
  : never;
