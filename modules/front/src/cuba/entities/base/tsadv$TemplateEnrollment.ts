import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class TemplateEnrollment extends BaseUuidEntity {
  static NAME = "tsadv$TemplateEnrollment";
  status?: any | null;
  date?: any | null;
  reason?: string | null;
}
export type TemplateEnrollmentViewName = "_base" | "_local" | "_minimal";
export type TemplateEnrollmentView<
  V extends TemplateEnrollmentViewName
> = never;
