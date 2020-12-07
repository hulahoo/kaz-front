import { ReportInputParameter } from "./report$ReportInputParameter";
export class ReportInputParameterExt extends ReportInputParameter {
  static NAME = "tsadv$ReportInputParameterExt";
  captionProperty?: string | null;
}
export type ReportInputParameterExtViewName = "_minimal" | "_local" | "_base";
export type ReportInputParameterExtView<
  V extends ReportInputParameterExtViewName
> = V extends "_minimal"
  ? Pick<ReportInputParameterExt, "id" | "locName">
  : V extends "_base"
  ? Pick<ReportInputParameterExt, "id" | "locName">
  : never;
