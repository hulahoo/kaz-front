import { EmailTemplate } from "./emailtemplates$EmailTemplate";
export class JsonEmailTemplate extends EmailTemplate {
  static NAME = "emailtemplates$JsonEmailTemplate";
  html?: string | null;
  reportXml?: string | null;
}
export type JsonEmailTemplateViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "emailTemplate-view";
export type JsonEmailTemplateView<
  V extends JsonEmailTemplateViewName
> = V extends "_base"
  ? Pick<
      JsonEmailTemplate,
      | "id"
      | "name"
      | "code"
      | "html"
      | "reportXml"
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
      JsonEmailTemplate,
      | "id"
      | "html"
      | "reportXml"
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
  ? Pick<JsonEmailTemplate, "id" | "name" | "code">
  : V extends "emailTemplate-view"
  ? Pick<
      JsonEmailTemplate,
      | "id"
      | "html"
      | "reportXml"
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
    >
  : never;
