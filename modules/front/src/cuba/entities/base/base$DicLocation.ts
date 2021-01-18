import { AbstractDictionary } from "./AbstractDictionary";
import { DicCity } from "./base$DicCity";
export class DicLocation extends AbstractDictionary {
  static NAME = "base$DicLocation";
  latitude?: any | null;
  longitude?: any | null;
  city?: DicCity | null;
  addressLang1?: string | null;
  addressLang2?: string | null;
  addressLang3?: string | null;
  addressLang4?: string | null;
  addressLang5?: string | null;
  addressLangValue?: string | null;
}
export type DicLocationViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "dicLocation.edit";
export type DicLocationView<V extends DicLocationViewName> = V extends "_base"
  ? Pick<
      DicLocation,
      | "id"
      | "langValue"
      | "latitude"
      | "longitude"
      | "addressLang1"
      | "addressLang2"
      | "addressLang3"
      | "addressLang4"
      | "addressLang5"
      | "addressLangValue"
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
      DicLocation,
      | "id"
      | "latitude"
      | "longitude"
      | "addressLang1"
      | "addressLang2"
      | "addressLang3"
      | "addressLang4"
      | "addressLang5"
      | "addressLangValue"
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
  ? Pick<DicLocation, "id" | "langValue">
  : V extends "dicLocation.edit"
  ? Pick<
      DicLocation,
      | "id"
      | "latitude"
      | "longitude"
      | "addressLang1"
      | "addressLang2"
      | "addressLang3"
      | "addressLang4"
      | "addressLang5"
      | "addressLangValue"
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
      | "city"
    >
  : never;
