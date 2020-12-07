import { AbstractSortableDictionary } from "./AbstractSortableDictionary";
export class DicContactInfoType extends AbstractSortableDictionary {
  static NAME = "base$DicContactInfoType";
  mask?: string | null;
}
export type DicContactInfoTypeViewName = "_minimal" | "_local" | "_base";
export type DicContactInfoTypeView<
  V extends DicContactInfoTypeViewName
> = V extends "_minimal"
  ? Pick<
      DicContactInfoType,
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
      DicContactInfoType,
      | "id"
      | "mask"
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
      DicContactInfoType,
      | "id"
      | "languageValue"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
      | "mask"
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
  : never;
