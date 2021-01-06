import { StandardEntity } from "./sys$StandardEntity";
import { Report } from "./report$Report";
import { EmailTemplate } from "./emailtemplates$EmailTemplate";
import { ParameterValue } from "./emailtemplates$ParameterValue";
export class TemplateReport extends StandardEntity {
  static NAME = "emailtemplates$TemplateReport";
  name?: string | null;
  report?: Report | null;
  emailTemplate?: EmailTemplate | null;
  parameterValues?: ParameterValue[] | null;
}
export type TemplateReportViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "templateParameters-view";
export type TemplateReportView<
  V extends TemplateReportViewName
> = V extends "_base"
  ? Pick<TemplateReport, "id" | "report" | "parameterValues" | "name">
  : V extends "_local"
  ? Pick<TemplateReport, "id" | "name">
  : V extends "_minimal"
  ? Pick<TemplateReport, "id" | "report" | "parameterValues">
  : V extends "templateParameters-view"
  ? Pick<
      TemplateReport,
      | "id"
      | "name"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deletedBy"
      | "report"
      | "parameterValues"
    >
  : never;
