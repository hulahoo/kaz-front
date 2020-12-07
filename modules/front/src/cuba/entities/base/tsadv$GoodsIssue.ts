import { AbstractParentEntity } from "./AbstractParentEntity";
import { Goods } from "./tsadv$Goods";
import { GoodsOrder } from "./tsadv$GoodsOrder";
export class GoodsIssue extends AbstractParentEntity {
  static NAME = "tsadv$GoodsIssue";
  goods?: Goods | null;
  quantity?: any | null;
  order?: GoodsOrder | null;
}
export type GoodsIssueViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "goodsIssue.edit";
export type GoodsIssueView<V extends GoodsIssueViewName> = V extends "_local"
  ? Pick<
      GoodsIssue,
      | "id"
      | "quantity"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      GoodsIssue,
      | "id"
      | "quantity"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "goodsIssue.edit"
  ? Pick<
      GoodsIssue,
      | "id"
      | "quantity"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "goods"
      | "order"
    >
  : never;
