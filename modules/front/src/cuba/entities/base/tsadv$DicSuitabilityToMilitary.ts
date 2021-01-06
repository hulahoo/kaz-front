import { AbstractDictionary } from "./AbstractDictionary";
export class DicSuitabilityToMilitary extends AbstractDictionary {
  static NAME = "tsadv$DicSuitabilityToMilitary";
}
export type DicSuitabilityToMilitaryViewName = "_base" | "_local" | "_minimal";
export type DicSuitabilityToMilitaryView<
  V extends DicSuitabilityToMilitaryViewName
> = V extends "_base"
  ? Pick<
      DicSuitabilityToMilitary,
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
  : V extends "_local"
  ? Pick<
      DicSuitabilityToMilitary,
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
  : V extends "_minimal"
  ? Pick<DicSuitabilityToMilitary, "id" | "langValue">
  : never;
