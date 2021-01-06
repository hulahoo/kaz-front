import { AbstractParentEntity } from "./AbstractParentEntity";
import { BudgetRequest } from "./tsadv$BudgetRequest";
import { DicCostType } from "./tsadv$DicCostType";
import { DicCurrency } from "./base$DicCurrency";
export class BudgetRequestItem extends AbstractParentEntity {
  static NAME = "tsadv$BudgetRequestItem";
  budgetRequest?: BudgetRequest | null;
  firstDayOfMonth?: any | null;
  name?: string | null;
  budgetItem?: DicCostType | null;
  amount?: any | null;
  currency?: DicCurrency | null;
}
export type BudgetRequestItemViewName = "_base" | "_local" | "_minimal";
export type BudgetRequestItemView<
  V extends BudgetRequestItemViewName
> = V extends "_base"
  ? Pick<
      BudgetRequestItem,
      | "id"
      | "firstDayOfMonth"
      | "name"
      | "amount"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      BudgetRequestItem,
      | "id"
      | "firstDayOfMonth"
      | "name"
      | "amount"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
