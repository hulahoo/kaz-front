import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { Course } from "./tsadv$Course";
import { DicBudgetItem } from "./tsadv$DicBudgetItem";
import { DicEmployeeCategory } from "./tsadv$DicEmployeeCategory";
import { DicLearningType } from "./tsadv$DicLearningType";
import { DicLearningHistoryStatus } from "./tsadv$DicLearningHistoryStatus";
import { PartyExt } from "./base$PartyExt";
import { DicCity } from "./base$DicCity";
import { LearningExpense } from "./tsadv$LearningExpense";
import { Enrollment } from "./tsadv$Enrollment";
import { BudgetRequest } from "./tsadv$BudgetRequest";
export class PersonLearningHistory extends AbstractParentEntity {
  static NAME = "tsadv$PersonLearningHistory";
  personGroup?: PersonGroupExt | null;
  startDate?: any | null;
  endDate?: any | null;
  hours?: any | null;
  course?: Course | null;
  budgetItem?: DicBudgetItem | null;
  employeeCategory?: DicEmployeeCategory | null;
  learningType?: DicLearningType | null;
  status?: DicLearningHistoryStatus | null;
  party?: PartyExt | null;
  location?: DicCity | null;
  learningExpense?: LearningExpense[] | null;
  courseName?: string | null;
  enrollment?: Enrollment | null;
  incomplete?: boolean | null;
  budget?: BudgetRequest | null;
}
export type PersonLearningHistoryViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "personLearningHistory.edit";
export type PersonLearningHistoryView<
  V extends PersonLearningHistoryViewName
> = V extends "_base"
  ? Pick<
      PersonLearningHistory,
      | "id"
      | "startDate"
      | "endDate"
      | "hours"
      | "courseName"
      | "incomplete"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PersonLearningHistory,
      | "id"
      | "startDate"
      | "endDate"
      | "hours"
      | "courseName"
      | "incomplete"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "personLearningHistory.edit"
  ? Pick<
      PersonLearningHistory,
      | "id"
      | "startDate"
      | "endDate"
      | "hours"
      | "courseName"
      | "incomplete"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "personGroup"
      | "course"
      | "budgetItem"
      | "employeeCategory"
      | "learningType"
      | "location"
      | "party"
      | "learningExpense"
      | "status"
      | "enrollment"
      | "budget"
    >
  : never;
