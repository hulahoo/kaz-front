import { AbstractParentEntity } from "./AbstractParentEntity";
import { OrderMasterEntity } from "./tsadv$OrderMasterEntity";
export class OrderMasterEntityProperty extends AbstractParentEntity {
  static NAME = "tsadv$OrderMasterEntityProperty";
  name?: string | null;
  langName1?: string | null;
  langName2?: string | null;
  langName3?: string | null;
  langName4?: string | null;
  langName5?: string | null;
  orderMasterEntity?: OrderMasterEntity | null;
  langName?: string | null;
}
export type OrderMasterEntityPropertyViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "orderMasterEntityProperty.edit";
export type OrderMasterEntityPropertyView<
  V extends OrderMasterEntityPropertyViewName
> = V extends "_base"
  ? Pick<
      OrderMasterEntityProperty,
      | "id"
      | "name"
      | "langName1"
      | "langName2"
      | "langName3"
      | "langName4"
      | "langName5"
      | "langName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      OrderMasterEntityProperty,
      | "id"
      | "name"
      | "langName1"
      | "langName2"
      | "langName3"
      | "langName4"
      | "langName5"
      | "langName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<OrderMasterEntityProperty, "id" | "name">
  : V extends "orderMasterEntityProperty.edit"
  ? Pick<
      OrderMasterEntityProperty,
      | "id"
      | "name"
      | "langName1"
      | "langName2"
      | "langName3"
      | "langName4"
      | "langName5"
      | "langName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
