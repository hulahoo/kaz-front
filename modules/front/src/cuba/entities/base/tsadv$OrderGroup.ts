import { AbstractGroup } from "./AbstractGroup";
import { Order } from "./tsadv$Order";
export class OrderGroup extends AbstractGroup {
  static NAME = "tsadv$OrderGroup";
  list?: Order[] | null;
  order?: Order | null;
}
export type OrderGroupViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "orderGroup-view";
export type OrderGroupView<V extends OrderGroupViewName> = V extends "_base"
  ? Pick<
      OrderGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      OrderGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<OrderGroup, "id">
  : V extends "orderGroup-view"
  ? Pick<OrderGroup, "id" | "list" | "order">
  : never;
