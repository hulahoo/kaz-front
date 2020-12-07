import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class TemplateEnrollment extends BaseUuidEntity {
  static NAME = "tsadv$TemplateEnrollment";
  status?: any | null;
  date?: any | null;
  reason?: string | null;
}
export type TemplateEnrollmentViewName = "_minimal" | "_local" | "_base";
export type TemplateEnrollmentView<
  V extends TemplateEnrollmentViewName
> = never;
