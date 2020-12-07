import { AbstractParentEntity } from "./AbstractParentEntity";
import { Budget } from "./tsadv$Budget";
import { Course } from "./tsadv$Course";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { DicMonth } from "./tsadv$DicMonth";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class CourseRequest extends AbstractParentEntity {
  static NAME = "tsadv$CourseRequest";
  budget?: Budget | null;
  course?: Course | null;
  organization?: OrganizationGroupExt | null;
  personCount?: number | null;
  month?: DicMonth | null;
  initiator?: PersonGroupExt | null;
  reason?: string | null;
  courseName?: string | null;
  budgetSum?: any | null;
}
export type CourseRequestViewName = "_minimal" | "_local" | "_base";
export type CourseRequestView<
  V extends CourseRequestViewName
> = V extends "_local"
  ? Pick<
      CourseRequest,
      | "id"
      | "personCount"
      | "reason"
      | "courseName"
      | "budgetSum"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      CourseRequest,
      | "id"
      | "personCount"
      | "reason"
      | "courseName"
      | "budgetSum"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
