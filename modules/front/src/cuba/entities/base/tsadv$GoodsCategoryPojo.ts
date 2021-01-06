import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class GoodsCategoryPojo extends BaseUuidEntity {
  static NAME = "tsadv$GoodsCategoryPojo";
  name?: string | null;
  categoryId?: string | null;
  goodsCount?: any | null;
  all?: number | null;
  main?: number | null;
  children?: GoodsCategoryPojo | null;
}
export type GoodsCategoryPojoViewName = "_base" | "_local" | "_minimal";
export type GoodsCategoryPojoView<
  V extends GoodsCategoryPojoViewName
> = V extends "_base"
  ? Pick<GoodsCategoryPojo, "id" | "name">
  : V extends "_minimal"
  ? Pick<GoodsCategoryPojo, "id" | "name">
  : never;
