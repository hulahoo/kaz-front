import { EmailTemplate } from "./emailtemplates$EmailTemplate";
import { TemplateReport } from "./emailtemplates$TemplateReport";
export class ReportEmailTemplate extends EmailTemplate {
  static NAME = "emailtemplates$ReportEmailTemplate";
  emailBodyReport?: TemplateReport | null;
}
export type ReportEmailTemplateViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "emailTemplate-view";
export type ReportEmailTemplateView<
  V extends ReportEmailTemplateViewName
> = V extends "_base"
  ? Pick<
      ReportEmailTemplate,
      | "id"
      | "name"
      | "code"
      | "useReportSubject"
      | "type"
      | "from"
      | "to"
      | "cc"
      | "bcc"
      | "subject"
    >
  : V extends "_local"
  ? Pick<
      ReportEmailTemplate,
      | "id"
      | "useReportSubject"
      | "name"
      | "type"
      | "code"
      | "from"
      | "to"
      | "cc"
      | "bcc"
      | "subject"
    >
  : V extends "_minimal"
  ? Pick<ReportEmailTemplate, "id" | "name" | "code">
  : V extends "emailTemplate-view"
  ? Pick<
      ReportEmailTemplate,
      | "id"
      | "useReportSubject"
      | "name"
      | "type"
      | "code"
      | "from"
      | "to"
      | "cc"
      | "bcc"
      | "subject"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deletedBy"
      | "attachedFiles"
      | "attachedTemplateReports"
      | "group"
      | "emailBodyReport"
    >
  : never;
