import { AbstractDictionary } from "./AbstractDictionary";
export class DicExchangeRateType extends AbstractDictionary {
  static NAME = "base$DicExchangeRateType";
}
export type DicExchangeRateTypeViewName = "_minimal" | "_local" | "_base";
export type DicExchangeRateTypeView<
  V extends DicExchangeRateTypeViewName
> = V extends "_minimal"
  ? Pick<DicExchangeRateType, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      DicExchangeRateType,
      | "id"
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
  : V extends "_base"
  ? Pick<
      DicExchangeRateType,
      | "id"
      | "langValue"
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
  : never;
