import { AbstractParentEntity } from "./AbstractParentEntity";
import { BudgetRequest } from "./tsadv$BudgetRequest";
import { DicMonth } from "./tsadv$DicMonth";
import { BudgetRequestItemDetail } from "./tsadv$BudgetRequestItemDetail";
export class BudgetRequestDetail extends AbstractParentEntity {
  static NAME = "tsadv$BudgetRequestDetail";
  budgetRequest?: BudgetRequest | null;
  month?: DicMonth | null;
  employeesCount?: number | null;
  businessTripEmployee?: number | null;
  budgetRequestItemDetail?: BudgetRequestItemDetail[] | null;
}
export type BudgetRequestDetailViewName = "_base" | "_local" | "_minimal";
export type BudgetRequestDetailView<
  V extends BudgetRequestDetailViewName
> = V extends "_base"
  ? Pick<
      BudgetRequestDetail,
      | "id"
      | "employeesCount"
      | "businessTripEmployee"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      BudgetRequestDetail,
      | "id"
      | "employeesCount"
      | "businessTripEmployee"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
