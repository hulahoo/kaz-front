import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { Report } from "./report$Report";
export class ReportScreen extends BaseUuidEntity {
  static NAME = "report$ReportScreen";
  report?: Report | null;
  screenId?: string | null;
}
export type ReportScreenViewName = "_minimal" | "_local" | "_base";
export type ReportScreenView<V extends ReportScreenViewName> = never;
