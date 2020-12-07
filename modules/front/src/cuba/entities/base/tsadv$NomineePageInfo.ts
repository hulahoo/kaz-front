import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { PageInfo } from "./tsadv$PageInfo";
import { NomineePojo } from "./tsadv$NomineePojo";
export class NomineePageInfo extends BaseUuidEntity {
  static NAME = "tsadv$NomineePageInfo";
  pageInfo?: PageInfo | null;
  nominees?: NomineePojo | null;
}
export type NomineePageInfoViewName = "_minimal" | "_local" | "_base";
export type NomineePageInfoView<V extends NomineePageInfoViewName> = never;
