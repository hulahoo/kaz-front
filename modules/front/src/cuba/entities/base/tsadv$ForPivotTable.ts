import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class ForPivotTable extends BaseUuidEntity {
  static NAME = "tsadv$ForPivotTable";
  personGroup?: PersonGroupExt | null;
}
export type ForPivotTableViewName = "_base" | "_local" | "_minimal";
export type ForPivotTableView<V extends ForPivotTableViewName> = never;
