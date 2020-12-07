import { AbstractTimeBasedEntity } from "./AbstractTimeBasedEntity";
import { OrderGroup } from "./tsadv$OrderGroup";
import { DicOrderType } from "./tsadv$DicOrderType";
import { DicOrderStatus } from "./tsadv$DicOrderStatus";
import { OrdAssignment } from "./tsadv$OrdAssignment";
import { DicOrderReason } from "./tsadv$DicOrderReason";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class Order extends AbstractTimeBasedEntity {
  static NAME = "tsadv$Order";
  orderNumber?: string | null;
  orderDate?: any | null;
  parent?: OrderGroup | null;
  group?: OrderGroup | null;
  orderType?: DicOrderType | null;
  orderStatus?: DicOrderStatus | null;
  ordAssignment?: OrdAssignment[] | null;
  cancelOrderNumber?: number | null;
  cancelOrderDate?: any | null;
  cancelOrderReason?: DicOrderReason | null;
  approverPersonGroup?: PersonGroupExt | null;
  orderReason?: DicOrderReason | null;
  caption?: string | null;
}
export type OrderViewName = "_minimal" | "_local" | "_base" | "order-view";
export type OrderView<V extends OrderViewName> = V extends "_minimal"
  ? Pick<Order, "id" | "orderType" | "orderNumber" | "orderDate">
  : V extends "_local"
  ? Pick<
      Order,
      | "id"
      | "orderNumber"
      | "orderDate"
      | "cancelOrderNumber"
      | "cancelOrderDate"
      | "caption"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : V extends "_base"
  ? Pick<
      Order,
      | "id"
      | "orderType"
      | "orderNumber"
      | "orderDate"
      | "cancelOrderNumber"
      | "cancelOrderDate"
      | "caption"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : V extends "order-view"
  ? Pick<
      Order,
      | "id"
      | "orderType"
      | "orderNumber"
      | "orderDate"
      | "ordAssignment"
      | "orderStatus"
      | "cancelOrderNumber"
      | "cancelOrderDate"
      | "cancelOrderReason"
      | "orderType"
      | "startDate"
      | "endDate"
      | "approverPersonGroup"
      | "group"
      | "orderReason"
      | "caption"
    >
  : never;
