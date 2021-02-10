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
export type DicQualityViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "dicQuality-browse"
  | "dicQuality-edit";
export type DicQualityView<V extends DicQualityViewName> = V extends "_base"
  ? Pick<
      DicQuality,
      | "id"
      | "langValue"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
      | "fullLangValue1"
      | "fullLangValue2"
      | "fullLangValue3"
      | "fullLangValue4"
      | "fullLangValue5"
      | "fullLangValue"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "description1"
      | "description2"
      | "description3"
      | "description4"
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
  ? Pick<
      DicQuality,
      | "id"
      | "langValue"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
    >
  : V extends "dicQuality-browse"
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
      | "company"
    >
  : V extends "dicQuality-edit"
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
      | "company"
    >
  : never;
