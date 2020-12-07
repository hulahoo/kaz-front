import { AbstractSortableDictionary } from "./AbstractSortableDictionary";
import { DicTe1Type } from "./base$DicTe1Type";
import { DicCityDistrict } from "./base$DicCityDistrict";
import { DicTe2Type } from "./base$DicTe2Type";
import { DicSettlementType } from "./base$DicSettlementType";
import { DicCountry } from "./base$DicCountry";
import { DicRegion } from "./base$DicRegion";
export class DicCity extends AbstractSortableDictionary {
  static NAME = "base$DicCity";
  te1Type?: DicTe1Type | null;
  regionDistrict?: string | null;
  cityDistricts?: DicCityDistrict[] | null;
  te2Type?: DicTe2Type | null;
  settlementType?: DicSettlementType | null;
  country?: DicCountry | null;
  te1Lang1?: string | null;
  te1Lang2?: string | null;
  te1Lang3?: string | null;
  te1Lang4?: string | null;
  te1Lang5?: string | null;
  te2Lang1?: string | null;
  te2Lang2?: string | null;
  te2Lang3?: string | null;
  te2Lang4?: string | null;
  te2Lang5?: string | null;
  settlementLang1?: string | null;
  settlementLang2?: string | null;
  settlementLang3?: string | null;
  settlementLang4?: string | null;
  settlementLang5?: string | null;
  latitude?: any | null;
  longitude?: any | null;
  baseRegion?: DicRegion | null;
  te1LangValue?: string | null;
  te2LangValue?: string | null;
  settlementLangValue?: string | null;
}
export type DicCityViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "dicCity.edit"
  | "dicCity.full";
export type DicCityView<V extends DicCityViewName> = V extends "_minimal"
  ? Pick<
      DicCity,
      | "id"
      | "languageValue"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
    >
  : V extends "_local"
  ? Pick<
      DicCity,
      | "id"
      | "regionDistrict"
      | "te1Lang1"
      | "te1Lang2"
      | "te1Lang3"
      | "te1Lang4"
      | "te1Lang5"
      | "te2Lang1"
      | "te2Lang2"
      | "te2Lang3"
      | "te2Lang4"
      | "te2Lang5"
      | "settlementLang1"
      | "settlementLang2"
      | "settlementLang3"
      | "settlementLang4"
      | "settlementLang5"
      | "latitude"
      | "longitude"
      | "te1LangValue"
      | "te2LangValue"
      | "settlementLangValue"
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
      | "languageValue"
    >
  : V extends "_base"
  ? Pick<
      DicCity,
      | "id"
      | "languageValue"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
      | "regionDistrict"
      | "te1Lang1"
      | "te1Lang2"
      | "te1Lang3"
      | "te1Lang4"
      | "te1Lang5"
      | "te2Lang1"
      | "te2Lang2"
      | "te2Lang3"
      | "te2Lang4"
      | "te2Lang5"
      | "settlementLang1"
      | "settlementLang2"
      | "settlementLang3"
      | "settlementLang4"
      | "settlementLang5"
      | "latitude"
      | "longitude"
      | "te1LangValue"
      | "te2LangValue"
      | "settlementLangValue"
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
  : V extends "dicCity.edit"
  ? Pick<
      DicCity,
      | "id"
      | "regionDistrict"
      | "te1Lang1"
      | "te1Lang2"
      | "te1Lang3"
      | "te1Lang4"
      | "te1Lang5"
      | "te2Lang1"
      | "te2Lang2"
      | "te2Lang3"
      | "te2Lang4"
      | "te2Lang5"
      | "settlementLang1"
      | "settlementLang2"
      | "settlementLang3"
      | "settlementLang4"
      | "settlementLang5"
      | "latitude"
      | "longitude"
      | "te1LangValue"
      | "te2LangValue"
      | "settlementLangValue"
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
      | "languageValue"
      | "te1Type"
      | "te2Type"
      | "settlementType"
      | "country"
    >
  : V extends "dicCity.full"
  ? Pick<
      DicCity,
      | "id"
      | "regionDistrict"
      | "te1Lang1"
      | "te1Lang2"
      | "te1Lang3"
      | "te1Lang4"
      | "te1Lang5"
      | "te2Lang1"
      | "te2Lang2"
      | "te2Lang3"
      | "te2Lang4"
      | "te2Lang5"
      | "settlementLang1"
      | "settlementLang2"
      | "settlementLang3"
      | "settlementLang4"
      | "settlementLang5"
      | "latitude"
      | "longitude"
      | "te1LangValue"
      | "te2LangValue"
      | "settlementLangValue"
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
      | "languageValue"
      | "cityDistricts"
      | "baseRegion"
    >
  : never;
