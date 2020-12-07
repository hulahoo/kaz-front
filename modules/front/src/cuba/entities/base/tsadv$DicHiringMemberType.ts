import { AbstractDictionary } from "./AbstractDictionary";
export class DicHiringMemberType extends AbstractDictionary {
  static NAME = "tsadv$DicHiringMemberType";
}
export type DicHiringMemberTypeViewName = "_minimal" | "_local" | "_base";
export type DicHiringMemberTypeView<
  V extends DicHiringMemberTypeViewName
> = V extends "_minimal"
  ? Pick<DicHiringMemberType, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      DicHiringMemberType,
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
      DicHiringMemberType,
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
