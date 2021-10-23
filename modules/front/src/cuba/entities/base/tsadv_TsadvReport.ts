import { Report } from "./report$Report";
import { FileDescriptor } from "./sys$FileDescriptor";
export class TsadvReport extends Report {
  static NAME = "tsadv_TsadvReport";
  screenshot?: FileDescriptor | null;
}
export type TsadvReportViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "report.edit"
  | "report.view";
export type TsadvReportView<V extends TsadvReportViewName> = V extends "_base"
  ? Pick<
      TsadvReport,
      | "id"
      | "locName"
      | "name"
      | "localeNames"
      | "code"
      | "reportType"
      | "description"
      | "xml"
      | "rolesIdx"
      | "screensIdx"
      | "inputEntityTypesIdx"
      | "restAccess"
      | "sysTenantId"
      | "system"
    >
  : V extends "_local"
  ? Pick<
      TsadvReport,
      | "id"
      | "name"
      | "localeNames"
      | "code"
      | "reportType"
      | "description"
      | "xml"
      | "rolesIdx"
      | "screensIdx"
      | "inputEntityTypesIdx"
      | "restAccess"
      | "sysTenantId"
      | "system"
      | "locName"
    >
  : V extends "_minimal"
  ? Pick<TsadvReport, "id" | "locName" | "name" | "localeNames">
  : V extends "report.edit"
  ? Pick<
      TsadvReport,
      | "id"
      | "name"
      | "localeNames"
      | "code"
      | "reportType"
      | "description"
      | "xml"
      | "rolesIdx"
      | "screensIdx"
      | "inputEntityTypesIdx"
      | "restAccess"
      | "sysTenantId"
      | "system"
      | "locName"
      | "screenshot"
      | "group"
      | "defaultTemplate"
      | "templates"
    >
  : V extends "report.view"
  ? Pick<
      TsadvReport,
      | "id"
      | "name"
      | "localeNames"
      | "code"
      | "description"
      | "reportType"
      | "group"
      | "screenshot"
    >
  : never;
