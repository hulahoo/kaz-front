import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class PivotTableAggregation extends BaseUuidEntity {
  static NAME = "report$PivotTableAggregation";
  mode?: any | null;
  caption?: string | null;
  function?: string | null;
}
export type PivotTableAggregationViewName = "_minimal" | "_local" | "_base";
export type PivotTableAggregationView<
  V extends PivotTableAggregationViewName
> = never;
