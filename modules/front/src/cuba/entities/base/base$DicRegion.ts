import { AbstractSortableDictionary } from "./AbstractSortableDictionary";
import { DicCountry } from "./base$DicCountry";
import { DicCity } from "./base$DicCity";
export class DicRegion extends AbstractSortableDictionary {
  static NAME = "base$DicRegion";
  country?: DicCountry | null;
  cities?: DicCity[] | null;
}
export type DicRegionViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "dicRegion.edit"
  | "dicRegion.full";
export type DicRegionView<V extends DicRegionViewName> = V extends "_minimal"
  ? Pick<
      DicRegion,
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
      DicRegion,
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
      | "languageValue"
    >
  : V extends "_base"
  ? Pick<
      DicRegion,
      | "id"
      | "languageValue"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
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
  : V extends "dicRegion.edit"
  ? Pick<
      DicRegion,
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
      | "languageValue"
      | "country"
    >
  : V extends "dicRegion.full"
  ? Pick<
      DicRegion,
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
      | "languageValue"
      | "cities"
      | "country"
    >
  : never;
