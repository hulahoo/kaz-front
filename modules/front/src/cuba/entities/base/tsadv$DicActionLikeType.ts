import { AbstractDictionary } from "./AbstractDictionary";
export class DicActionLikeType extends AbstractDictionary {
  static NAME = "tsadv$DicActionLikeType";
}
export type DicActionLikeTypeViewName = "_minimal" | "_local" | "_base";
export type DicActionLikeTypeView<
  V extends DicActionLikeTypeViewName
> = V extends "_minimal"
  ? Pick<DicActionLikeType, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      DicActionLikeType,
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
      DicActionLikeType,
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
