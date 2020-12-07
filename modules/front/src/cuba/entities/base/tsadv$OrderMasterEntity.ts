import { AbstractParentEntity } from "./AbstractParentEntity";
import { OrderMasterEntityProperty } from "./tsadv$OrderMasterEntityProperty";
import { OrderMaster } from "./tsadv$OrderMaster";
export class OrderMasterEntity extends AbstractParentEntity {
  static NAME = "tsadv$OrderMasterEntity";
  entityName?: string | null;
  defaultEntity?: boolean | null;
  entityNameLang1?: string | null;
  entityNameLang2?: string | null;
  entityNameLang3?: string | null;
  entityNameLang4?: string | null;
  entityNameLang5?: string | null;
  order?: number | null;
  properties?: OrderMasterEntityProperty[] | null;
  orderMaster?: OrderMaster | null;
  entityLangName?: string | null;
}
export type OrderMasterEntityViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "orderMasterEntity.edit";
export type OrderMasterEntityView<
  V extends OrderMasterEntityViewName
> = V extends "_local"
  ? Pick<
      OrderMasterEntity,
      | "id"
      | "entityName"
      | "defaultEntity"
      | "entityNameLang1"
      | "entityNameLang2"
      | "entityNameLang3"
      | "entityNameLang4"
      | "entityNameLang5"
      | "order"
      | "entityLangName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      OrderMasterEntity,
      | "id"
      | "entityName"
      | "defaultEntity"
      | "entityNameLang1"
      | "entityNameLang2"
      | "entityNameLang3"
      | "entityNameLang4"
      | "entityNameLang5"
      | "order"
      | "entityLangName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "orderMasterEntity.edit"
  ? Pick<
      OrderMasterEntity,
      | "id"
      | "entityName"
      | "defaultEntity"
      | "entityNameLang1"
      | "entityNameLang2"
      | "entityNameLang3"
      | "entityNameLang4"
      | "entityNameLang5"
      | "order"
      | "entityLangName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "properties"
    >
  : never;
