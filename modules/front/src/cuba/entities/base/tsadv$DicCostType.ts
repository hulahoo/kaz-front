import { AbstractDictionary } from "./AbstractDictionary";
export class DicCostType extends AbstractDictionary {
  static NAME = "tsadv$DicCostType";
  isBusinessTrip?: boolean | null;
}
export type DicCostTypeViewName = "_base" | "_local" | "_minimal";
export type DicCostTypeView<V extends DicCostTypeViewName> = V extends "_base"
  ? Pick<
      DicCostType,
      | "id"
      | "langValue"
      | "isBusinessTrip"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "langValue1"
      | "description1"
      | "langValue2"
      | "description2"
      | "langValue3"
      | "description3"
      | "langValue4"
      | "description4"
      | "langValue5"
      | "description5"
      | "startDate"
      | "endDate"
      | "code"
      | "isSystemRecord"
      | "active"
      | "isDefault"
      | "order"
    >
  : V extends "_local"
  ? Pick<
      DicCostType,
      | "id"
      | "isBusinessTrip"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "langValue1"
      | "description1"
      | "langValue2"
      | "description2"
      | "langValue3"
      | "description3"
      | "langValue4"
      | "description4"
      | "langValue5"
      | "description5"
      | "startDate"
      | "endDate"
      | "code"
      | "isSystemRecord"
      | "active"
      | "isDefault"
      | "order"
    >
  : V extends "_minimal"
  ? Pick<DicCostType, "id" | "langValue">
  : never;
