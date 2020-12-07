import { AbstractGroup } from "./AbstractGroup";
import { Grade } from "./tsadv$Grade";
export class GradeGroup extends AbstractGroup {
  static NAME = "tsadv$GradeGroup";
  list?: Grade[] | null;
  grade?: Grade | null;
}
export type GradeGroupViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "gradeGroup.browse";
export type GradeGroupView<V extends GradeGroupViewName> = V extends "_minimal"
  ? Pick<GradeGroup, "id" | "grade">
  : V extends "_local"
  ? Pick<
      GradeGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      GradeGroup,
      "id" | "grade" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "gradeGroup.browse"
  ? Pick<
      GradeGroup,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "grade"
    >
  : never;
