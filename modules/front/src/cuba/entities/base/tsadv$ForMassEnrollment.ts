import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { Course } from "./tsadv$Course";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { PositionGroupExt } from "./base$PositionGroupExt";
import { JobGroup } from "./tsadv$JobGroup";
export class ForMassEnrollment extends BaseUuidEntity {
  static NAME = "tsadv$ForMassEnrollment";
  course?: Course | null;
  organization?: OrganizationGroupExt | null;
  check?: boolean | null;
  position?: PositionGroupExt | null;
  job?: JobGroup | null;
}
export type ForMassEnrollmentViewName = "_minimal" | "_local" | "_base";
export type ForMassEnrollmentView<V extends ForMassEnrollmentViewName> = never;
