import { AbstractDictionary } from "./AbstractDictionary";
export class DicHierarchyType extends AbstractDictionary {
  static NAME = "base$DicHierarchyType";
}
export type DicHierarchyTypeViewName = "_base" | "_local" | "_minimal";
export type DicHierarchyTypeView<
  V extends DicHierarchyTypeViewName
> = V extends "_base"
  ? Pick<
      DicHierarchyType,
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
  : V extends "_local"
  ? Pick<
      DicHierarchyType,
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
  : V extends "_minimal"
  ? Pick<DicHierarchyType, "id" | "langValue">
  : never;
