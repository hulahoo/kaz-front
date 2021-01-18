import { StandardEntity } from "./sys$StandardEntity";
import { TemplateGroup } from "./emailtemplates$TemplateGroup";
import { FileDescriptor } from "./sys$FileDescriptor";
import { TemplateReport } from "./emailtemplates$TemplateReport";
export class EmailTemplate extends StandardEntity {
  static NAME = "emailtemplates$EmailTemplate";
  useReportSubject?: boolean | null;
  name?: string | null;
  group?: TemplateGroup | null;
  type?: any | null;
  code?: string | null;
  from?: string | null;
  to?: string | null;
  cc?: string | null;
  bcc?: string | null;
  subject?: string | null;
  attachedFiles?: FileDescriptor[] | null;
  attachedTemplateReports?: TemplateReport[] | null;
}
export type EmailTemplateViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "emailTemplate-view";
export type EmailTemplateView<
  V extends EmailTemplateViewName
> = V extends "_base"
  ? Pick<
      EmailTemplate,
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
      EmailTemplate,
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
  ? Pick<EmailTemplate, "id" | "name" | "code">
  : V extends "emailTemplate-view"
  ? Pick<
      EmailTemplate,
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
      | "group"
      | "attachedTemplateReports"
    >
  : never;
