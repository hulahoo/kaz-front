import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicCurrency } from "./base$DicCurrency";
export class GradeRule extends AbstractParentEntity {
  static NAME = "tsadv$GradeRule";
  ruleName?: string | null;
  currency?: DicCurrency | null;
  grossNet?: any | null;
}
export type GradeRuleViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "gradeRule.view"
  | "gradeRule.edit";
export type GradeRuleView<V extends GradeRuleViewName> = V extends "_minimal"
  ? Pick<GradeRule, "id" | "ruleName">
  : V extends "_local"
  ? Pick<
      GradeRule,
      | "id"
      | "ruleName"
      | "grossNet"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      GradeRule,
      | "id"
      | "ruleName"
      | "grossNet"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "gradeRule.view"
  ? Pick<
      GradeRule,
      | "id"
      | "ruleName"
      | "grossNet"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "currency"
    >
  : V extends "gradeRule.edit"
  ? Pick<
      GradeRule,
      | "id"
      | "ruleName"
      | "grossNet"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "currency"
    >
  : never;
