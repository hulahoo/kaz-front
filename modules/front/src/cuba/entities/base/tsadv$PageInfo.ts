import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class PageInfo extends BaseUuidEntity {
  static NAME = "tsadv$PageInfo";
  pagesCount?: any | null;
  totalRowsCount?: any | null;
}
export type PageInfoViewName = "_base" | "_local" | "_minimal";
export type PageInfoView<V extends PageInfoViewName> = never;
