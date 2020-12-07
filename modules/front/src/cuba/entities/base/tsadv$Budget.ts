import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicBudgetStatus } from "./tsadv$DicBudgetStatus";
export class Budget extends AbstractParentEntity {
  static NAME = "tsadv$Budget";
  name?: string | null;
  description?: string | null;
  budgetStartDate?: any | null;
  budgetEndDate?: any | null;
  requestStartDate?: any | null;
  requestEndDate?: any | null;
  status?: DicBudgetStatus | null;
  previousBudget?: Budget | null;
}
export type BudgetViewName = "_minimal" | "_local" | "_base" | "budget.view";
export type BudgetView<V extends BudgetViewName> = V extends "_minimal"
  ? Pick<Budget, "id" | "name">
  : V extends "_local"
  ? Pick<
      Budget,
      | "id"
      | "name"
      | "description"
      | "budgetStartDate"
      | "budgetEndDate"
      | "requestStartDate"
      | "requestEndDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      Budget,
      | "id"
      | "name"
      | "description"
      | "budgetStartDate"
      | "budgetEndDate"
      | "requestStartDate"
      | "requestEndDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "budget.view"
  ? Pick<
      Budget,
      | "id"
      | "name"
      | "description"
      | "budgetStartDate"
      | "budgetEndDate"
      | "requestStartDate"
      | "requestEndDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "status"
      | "previousBudget"
    >
  : never;
