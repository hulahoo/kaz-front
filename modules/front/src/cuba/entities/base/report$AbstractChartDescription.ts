import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class AbstractChartDescription extends BaseUuidEntity {
  static NAME = "report$AbstractChartDescription";
  showLegend?: boolean | null;
  customJsonConfig?: string | null;
}
export type AbstractChartDescriptionViewName = "_minimal" | "_local" | "_base";
export type AbstractChartDescriptionView<
  V extends AbstractChartDescriptionViewName
> = never;
