import { AbstractGroup } from "./AbstractGroup";
import { GradeRuleValue } from "./tsadv$GradeRuleValue";
export class GradeRuleValueGroup extends AbstractGroup {
  static NAME = "tsadv$GradeRuleValueGroup";
  list?: GradeRuleValue[] | null;
  gradeRuleValue?: GradeRuleValue | null;
}
export type GradeRuleValueGroupViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "gradeRuleValueGroup.view";
export type GradeRuleValueGroupView<
  V extends GradeRuleValueGroupViewName
> = V extends "_minimal"
  ? Pick<GradeRuleValueGroup, "id">
  : V extends "_local"
  ? Pick<
      GradeRuleValueGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      GradeRuleValueGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "gradeRuleValueGroup.view"
  ? Pick<
      GradeRuleValueGroup,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "gradeRuleValue"
    >
  : never;
