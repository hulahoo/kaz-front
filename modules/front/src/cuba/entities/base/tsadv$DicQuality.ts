import { AbstractDictionary } from "./AbstractDictionary";
export class DicQuality extends AbstractDictionary {
  static NAME = "tsadv$DicQuality";
  fullLangValue1?: string | null;
  fullLangValue2?: string | null;
  fullLangValue3?: string | null;
  fullLangValue4?: string | null;
  fullLangValue5?: string | null;
  fullLangValue?: string | null;
}
export type DicQualityViewName = "_base" | "_local" | "_minimal";
export type DicQualityView<V extends DicQualityViewName> = V extends "_base"
  ? Pick<
      DicQuality,
      | "id"
      | "langValue"
      | "fullLangValue1"
      | "fullLangValue2"
      | "fullLangValue3"
      | "fullLangValue4"
      | "fullLangValue5"
      | "fullLangValue"
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
      DicQuality,
      | "id"
      | "fullLangValue1"
      | "fullLangValue2"
      | "fullLangValue3"
      | "fullLangValue4"
      | "fullLangValue5"
      | "fullLangValue"
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
  ? Pick<DicQuality, "id" | "langValue">
  : never;
