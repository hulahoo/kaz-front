import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class PivotTableProperty extends BaseUuidEntity {
  static NAME = "report$PivotTableProperty";
  name?: string | null;
  caption?: string | null;
  function?: string | null;
  hidden?: boolean | null;
  type?: any | null;
}
export type PivotTablePropertyViewName = "_minimal" | "_local" | "_base";
export type PivotTablePropertyView<
  V extends PivotTablePropertyViewName
> = never;
