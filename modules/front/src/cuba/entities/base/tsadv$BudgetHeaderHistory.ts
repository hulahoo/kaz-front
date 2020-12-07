import { AbstractParentEntity } from "./AbstractParentEntity";
import { BudgetHeader } from "./tsadv$BudgetHeader";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class BudgetHeaderHistory extends AbstractParentEntity {
  static NAME = "tsadv$BudgetHeaderHistory";
  budgetHeader?: BudgetHeader | null;
  budgetHeaderStatus?: any | null;
  changePerson?: PersonGroupExt | null;
  comment?: string | null;
}
export type BudgetHeaderHistoryViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "budgetHeaderHistory-view";
export type BudgetHeaderHistoryView<
  V extends BudgetHeaderHistoryViewName
> = V extends "_local"
  ? Pick<
      BudgetHeaderHistory,
      | "id"
      | "budgetHeaderStatus"
      | "comment"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      BudgetHeaderHistory,
      | "id"
      | "budgetHeaderStatus"
      | "comment"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "budgetHeaderHistory-view"
  ? Pick<
      BudgetHeaderHistory,
      | "id"
      | "budgetHeaderStatus"
      | "comment"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "budgetHeader"
      | "changePerson"
      | "updateTs"
    >
  : never;
