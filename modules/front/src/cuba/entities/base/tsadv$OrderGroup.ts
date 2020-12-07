import { AbstractGroup } from "./AbstractGroup";
import { Order } from "./tsadv$Order";
export class OrderGroup extends AbstractGroup {
  static NAME = "tsadv$OrderGroup";
  list?: Order[] | null;
  order?: Order | null;
}
export type OrderGroupViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "orderGroup-view";
export type OrderGroupView<V extends OrderGroupViewName> = V extends "_minimal"
  ? Pick<OrderGroup, "id">
  : V extends "_local"
  ? Pick<
      OrderGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      OrderGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "orderGroup-view"
  ? Pick<OrderGroup, "id" | "list" | "order">
  : never;
