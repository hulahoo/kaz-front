import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class PageInfo extends BaseUuidEntity {
  static NAME = "tsadv$PageInfo";
  pagesCount?: any | null;
  totalRowsCount?: any | null;
}
export type PageInfoViewName = "_minimal" | "_local" | "_base";
export type PageInfoView<V extends PageInfoViewName> = never;
