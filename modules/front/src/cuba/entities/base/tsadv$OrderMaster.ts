import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicOrderType } from "./tsadv$DicOrderType";
import { OrderMasterEntity } from "./tsadv$OrderMasterEntity";
export class OrderMaster extends AbstractParentEntity {
  static NAME = "tsadv$OrderMaster";
  orderType?: DicOrderType | null;
  orderMasterEntities?: OrderMasterEntity[] | null;
}
export type OrderMasterViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "orderMaster.edit";
export type OrderMasterView<V extends OrderMasterViewName> = V extends "_local"
  ? Pick<
      OrderMaster,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      OrderMaster,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "orderMaster.edit"
  ? Pick<
      OrderMaster,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "orderType"
      | "orderMasterEntities"
    >
  : never;
