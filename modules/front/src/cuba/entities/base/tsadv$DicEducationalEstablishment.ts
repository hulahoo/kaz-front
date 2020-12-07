import { AbstractDictionary } from "./AbstractDictionary";
import { DicEducationalEstablishmentType } from "./tsadv$DicEducationalEstablishmentType";
export class DicEducationalEstablishment extends AbstractDictionary {
  static NAME = "tsadv$DicEducationalEstablishment";
  educationalEstablishmentType?: DicEducationalEstablishmentType | null;
}
export type DicEducationalEstablishmentViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "dicEducationalEstablishment.edit";
export type DicEducationalEstablishmentView<
  V extends DicEducationalEstablishmentViewName
> = V extends "_minimal"
  ? Pick<DicEducationalEstablishment, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      DicEducationalEstablishment,
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
      DicEducationalEstablishment,
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
  : V extends "dicEducationalEstablishment.edit"
  ? Pick<
      DicEducationalEstablishment,
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
      | "educationalEstablishmentType"
    >
  : never;
