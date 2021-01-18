import { AbstractSortableDictionary } from "./AbstractSortableDictionary";
export class DicContactInfoType extends AbstractSortableDictionary {
  static NAME = "base$DicContactInfoType";
  validate?: boolean | null;
  validationType?: any | null;
  validationKind?: any | null;
  validationRegExp?: string | null;
  errorMessage1?: string | null;
  errorMessage2?: string | null;
  errorMessage3?: string | null;
  errorMessage4?: string | null;
  errorMessage5?: string | null;
  mask?: string | null;
  errorMessage?: string | null;
}
export type DicContactInfoTypeViewName = "_base" | "_local" | "_minimal";
export type DicContactInfoTypeView<
  V extends DicContactInfoTypeViewName
> = V extends "_base"
  ? Pick<
      DicContactInfoType,
      | "id"
      | "languageValue"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
      | "validate"
      | "validationType"
      | "validationKind"
      | "validationRegExp"
      | "errorMessage1"
      | "errorMessage2"
      | "errorMessage3"
      | "errorMessage4"
      | "errorMessage5"
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
  : V extends "_local"
  ? Pick<
      DicContactInfoType,
      | "id"
      | "validate"
      | "validationType"
      | "validationKind"
      | "validationRegExp"
      | "errorMessage1"
      | "errorMessage2"
      | "errorMessage3"
      | "errorMessage4"
      | "errorMessage5"
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
  : V extends "_minimal"
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
  : never;
