import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { Report } from "./report$Report";
export class ReportValueFormat extends BaseUuidEntity {
  static NAME = "report$ReportValueFormat";
  valueName?: string | null;
  formatString?: string | null;
  report?: Report | null;
  groovyScript?: boolean | null;
}
export type ReportValueFormatViewName = "_minimal" | "_local" | "_base";
export type ReportValueFormatView<V extends ReportValueFormatViewName> = never;
