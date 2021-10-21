import { AbstractGroup } from "./AbstractGroup";
import { Grade } from "./tsadv$Grade";
import { DicCompany } from "./base_DicCompany";
export class GradeGroup extends AbstractGroup {
  static NAME = "tsadv$GradeGroup";
  list?: Grade[] | null;
  company?: DicCompany | null;
  grade?: Grade | null;
  availableSalary?: boolean | null;
}
export type GradeGroupViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "gradeGroup-receptionAssignment"
  | "gradeGroup.browse";
export type GradeGroupView<V extends GradeGroupViewName> = V extends "_base"
  ? Pick<
      GradeGroup,
      | "id"
      | "grade"
      | "availableSalary"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      GradeGroup,
      | "id"
      | "availableSalary"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<GradeGroup, "id" | "grade">
  : V extends "gradeGroup-receptionAssignment"
  ? Pick<
      GradeGroup,
      | "id"
      | "availableSalary"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "grade"
    >
  : V extends "gradeGroup.browse"
  ? Pick<
      GradeGroup,
      | "id"
      | "availableSalary"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "company"
      | "grade"
    >
  : never;
