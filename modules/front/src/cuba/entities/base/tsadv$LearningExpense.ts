import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicCostType } from "./tsadv$DicCostType";
import { DicCurrency } from "./base$DicCurrency";
import { PersonLearningContract } from "./tsadv$PersonLearningContract";
import { Enrollment } from "./tsadv$Enrollment";
import { DicMonth } from "./tsadv$DicMonth";
import { PersonLearningHistory } from "./tsadv$PersonLearningHistory";
export class LearningExpense extends AbstractParentEntity {
  static NAME = "tsadv$LearningExpense";
  expenseType?: DicCostType | null;
  currency?: DicCurrency | null;
  amount?: number | null;
  personLearningContract?: PersonLearningContract | null;
  personEnrollment?: Enrollment | null;
  dicMonth?: DicMonth | null;
  year?: number | null;
  personLearningHistory?: PersonLearningHistory | null;
}
export type LearningExpenseViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "learningExpense.edit";
export type LearningExpenseView<
  V extends LearningExpenseViewName
> = V extends "_base"
  ? Pick<
      LearningExpense,
      | "id"
      | "amount"
      | "year"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      LearningExpense,
      | "id"
      | "amount"
      | "year"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "learningExpense.edit"
  ? Pick<
      LearningExpense,
      | "id"
      | "amount"
      | "year"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "expenseType"
      | "currency"
      | "personLearningContract"
      | "personEnrollment"
      | "dicMonth"
      | "personLearningHistory"
    >
  : never;
