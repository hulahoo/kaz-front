import { AbstractDictionary } from "./AbstractDictionary";
export class DicGoodsCategory extends AbstractDictionary {
  static NAME = "tsadv$DicGoodsCategory";
  parent?: DicGoodsCategory | null;
}
export type DicGoodsCategoryViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "dicGoodsCategory.edit";
export type DicGoodsCategoryView<
  V extends DicGoodsCategoryViewName
> = V extends "_minimal"
  ? Pick<DicGoodsCategory, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      DicGoodsCategory,
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
      DicGoodsCategory,
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
  : V extends "dicGoodsCategory.edit"
  ? Pick<
      DicGoodsCategory,
      | "id"
      | "langValue"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
      | "code"
      | "parent"
      | "isSystemRecord"
    >
  : never;
