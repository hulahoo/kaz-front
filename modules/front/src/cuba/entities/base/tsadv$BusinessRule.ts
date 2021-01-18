import { StandardEntity } from "./sys$StandardEntity";
export class BusinessRule extends StandardEntity {
  static NAME = "tsadv$BusinessRule";
  ruleCode?: string | null;
  ruleName?: string | null;
  description?: string | null;
  ruleStatus?: any | null;
  errorTextLang1?: string | null;
  errorTextLang2?: string | null;
  errorTextLang3?: string | null;
  errorTextLang4?: string | null;
  errorTextLang5?: string | null;
  warningTextLang1?: string | null;
  warningTextLang2?: string | null;
  warningTextLang3?: string | null;
  warningTextLang4?: string | null;
  warningTextLang5?: string | null;
}
export type BusinessRuleViewName = "_base" | "_local" | "_minimal";
export type BusinessRuleView<V extends BusinessRuleViewName> = V extends "_base"
  ? Pick<
      BusinessRule,
      | "id"
      | "ruleName"
      | "ruleCode"
      | "description"
      | "ruleStatus"
      | "errorTextLang1"
      | "errorTextLang2"
      | "errorTextLang3"
      | "errorTextLang4"
      | "errorTextLang5"
      | "warningTextLang1"
      | "warningTextLang2"
      | "warningTextLang3"
      | "warningTextLang4"
      | "warningTextLang5"
    >
  : V extends "_local"
  ? Pick<
      BusinessRule,
      | "id"
      | "ruleCode"
      | "ruleName"
      | "description"
      | "ruleStatus"
      | "errorTextLang1"
      | "errorTextLang2"
      | "errorTextLang3"
      | "errorTextLang4"
      | "errorTextLang5"
      | "warningTextLang1"
      | "warningTextLang2"
      | "warningTextLang3"
      | "warningTextLang4"
      | "warningTextLang5"
    >
  : V extends "_minimal"
  ? Pick<BusinessRule, "id" | "ruleName">
  : never;
