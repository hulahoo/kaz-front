import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicGoodsCategory } from "./tsadv$DicGoodsCategory";
import { GoodsImage } from "./tsadv$GoodsImage";
import { GoodsImageForReport } from "./tsadv$GoodsImageForReport";
import { RecognitionProvider } from "./tsadv$RecognitionProvider";
export class Goods extends AbstractParentEntity {
  static NAME = "tsadv$Goods";
  nameLang1?: string | null;
  category?: DicGoodsCategory | null;
  goodsImages?: GoodsImage[] | null;
  goodsImagesForReport?: GoodsImageForReport[] | null;
  nameLang2?: string | null;
  nameLang3?: string | null;
  nameLang4?: string | null;
  nameLang5?: string | null;
  descriptionLang1?: string | null;
  descriptionLang2?: string | null;
  descriptionLang3?: string | null;
  descriptionLang4?: string | null;
  descriptionLang5?: string | null;
  price?: any | null;
  active?: boolean | null;
  recognitionProvider?: RecognitionProvider | null;
  name?: string | null;
  description?: string | null;
}
export type GoodsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "goods.edit"
  | "goods.for.service";
export type GoodsView<V extends GoodsViewName> = V extends "_base"
  ? Pick<
      Goods,
      | "id"
      | "name"
      | "nameLang1"
      | "nameLang2"
      | "nameLang3"
      | "nameLang4"
      | "nameLang5"
      | "descriptionLang1"
      | "descriptionLang2"
      | "descriptionLang3"
      | "descriptionLang4"
      | "descriptionLang5"
      | "price"
      | "active"
      | "description"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Goods,
      | "id"
      | "nameLang1"
      | "nameLang2"
      | "nameLang3"
      | "nameLang4"
      | "nameLang5"
      | "descriptionLang1"
      | "descriptionLang2"
      | "descriptionLang3"
      | "descriptionLang4"
      | "descriptionLang5"
      | "price"
      | "active"
      | "name"
      | "description"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<Goods, "id" | "name">
  : V extends "goods.edit"
  ? Pick<
      Goods,
      | "id"
      | "nameLang1"
      | "nameLang2"
      | "nameLang3"
      | "nameLang4"
      | "nameLang5"
      | "descriptionLang1"
      | "descriptionLang2"
      | "descriptionLang3"
      | "descriptionLang4"
      | "descriptionLang5"
      | "price"
      | "active"
      | "name"
      | "description"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "category"
      | "goodsImages"
      | "goodsImagesForReport"
      | "recognitionProvider"
    >
  : V extends "goods.for.service"
  ? Pick<
      Goods,
      | "id"
      | "nameLang1"
      | "nameLang2"
      | "nameLang3"
      | "nameLang4"
      | "nameLang5"
      | "descriptionLang1"
      | "descriptionLang2"
      | "descriptionLang3"
      | "descriptionLang4"
      | "descriptionLang5"
      | "price"
      | "active"
      | "name"
      | "description"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "category"
    >
  : never;
