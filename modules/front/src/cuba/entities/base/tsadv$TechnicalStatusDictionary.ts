import { AbstractDictionary } from "./AbstractDictionary";
export class TechnicalStatusDictionary extends AbstractDictionary {
  static NAME = "tsadv$TechnicalStatusDictionary";
}
export type TechnicalStatusDictionaryViewName = "_minimal" | "_local" | "_base";
export type TechnicalStatusDictionaryView<
  V extends TechnicalStatusDictionaryViewName
> = V extends "_minimal"
  ? Pick<TechnicalStatusDictionary, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      TechnicalStatusDictionary,
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
      TechnicalStatusDictionary,
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
