import { StandardEntity } from "./sys$StandardEntity";
import { Internship } from "./tsadv$Internship";
import { DicCostType } from "./tsadv$DicCostType";
import { DicCurrency } from "./base$DicCurrency";
export class InternshipExpenses extends StandardEntity {
  static NAME = "tsadv$InternshipExpenses";
  internship?: Internship | null;
  expenseType?: DicCostType | null;
  amount?: any | null;
  currency?: DicCurrency | null;
}
export type InternshipExpensesViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "internshipExpenses.edit";
export type InternshipExpensesView<
  V extends InternshipExpensesViewName
> = V extends "_base"
  ? Pick<InternshipExpenses, "id" | "amount">
  : V extends "_local"
  ? Pick<InternshipExpenses, "id" | "amount">
  : V extends "internshipExpenses.edit"
  ? Pick<
      InternshipExpenses,
      "id" | "amount" | "expenseType" | "currency" | "internship"
    >
  : never;
