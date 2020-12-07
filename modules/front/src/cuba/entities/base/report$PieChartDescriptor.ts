import { AbstractChartDescription } from "./report$AbstractChartDescription";
export class PieChartDescription extends AbstractChartDescription {
  static NAME = "report$PieChartDescriptor";
  bandName?: string | null;
  titleField?: string | null;
  valueField?: string | null;
  colorField?: string | null;
  units?: string | null;
}
export type PieChartDescriptionViewName = "_minimal" | "_local" | "_base";
export type PieChartDescriptionView<
  V extends PieChartDescriptionViewName
> = never;
