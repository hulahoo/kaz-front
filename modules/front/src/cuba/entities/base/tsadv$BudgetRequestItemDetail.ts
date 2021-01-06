import { AbstractParentEntity } from "./AbstractParentEntity";
import { BudgetRequestDetail } from "./tsadv$BudgetRequestDetail";
import { BudgetRequestItem } from "./tsadv$BudgetRequestItem";
import { DicCostType } from "./tsadv$DicCostType";
import { DicCurrency } from "./base$DicCurrency";
export class BudgetRequestItemDetail extends AbstractParentEntity {
  static NAME = "tsadv$BudgetRequestItemDetail";
  budgetRequestDetail?: BudgetRequestDetail | null;
  budgetRequestItem?: BudgetRequestItem | null;
  budgetItem?: DicCostType | null;
  amount?: any | null;
  currency?: DicCurrency | null;
  month?: any | null;
}
export type BudgetRequestItemDetailViewName = "_base" | "_local" | "_minimal";
export type BudgetRequestItemDetailView<
  V extends BudgetRequestItemDetailViewName
> = V extends "_base"
  ? Pick<
      BudgetRequestItemDetail,
      | "id"
      | "amount"
      | "month"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      BudgetRequestItemDetail,
      | "id"
      | "amount"
      | "month"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
