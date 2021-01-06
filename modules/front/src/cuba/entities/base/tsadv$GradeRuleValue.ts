import { AbstractTimeBasedEntity } from "./AbstractTimeBasedEntity";
import { GradeGroup } from "./tsadv$GradeGroup";
import { GradeRuleValueGroup } from "./tsadv$GradeRuleValueGroup";
import { GradeRule } from "./tsadv$GradeRule";
export class GradeRuleValue extends AbstractTimeBasedEntity {
  static NAME = "tsadv$GradeRuleValue";
  value?: any | null;
  min?: any | null;
  mid?: any | null;
  max?: any | null;
  gradeGroup?: GradeGroup | null;
  group?: GradeRuleValueGroup | null;
  gradeRule?: GradeRule | null;
}
export type GradeRuleValueViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "gradeRuleValue-view"
  | "gradeRuleValue.edit";
export type GradeRuleValueView<
  V extends GradeRuleValueViewName
> = V extends "_base"
  ? Pick<
      GradeRuleValue,
      | "id"
      | "max"
      | "mid"
      | "min"
      | "value"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : V extends "_local"
  ? Pick<
      GradeRuleValue,
      | "id"
      | "value"
      | "min"
      | "mid"
      | "max"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : V extends "_minimal"
  ? Pick<GradeRuleValue, "id" | "max" | "mid" | "min" | "value">
  : V extends "gradeRuleValue-view"
  ? Pick<
      GradeRuleValue,
      | "id"
      | "value"
      | "min"
      | "mid"
      | "max"
      | "gradeGroup"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : V extends "gradeRuleValue.edit"
  ? Pick<
      GradeRuleValue,
      | "id"
      | "value"
      | "min"
      | "mid"
      | "max"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
      | "gradeGroup"
      | "group"
      | "gradeRule"
    >
  : never;
