import { AbstractParentEntity } from "./AbstractParentEntity";
import { Budget } from "./tsadv$Budget";
import { DicRequiredEducation } from "./tsadv$DicRequiredEducation";
import { DicEmployeeCategory } from "./tsadv$DicEmployeeCategory";
import { DicTrainingMethod } from "./tsadv$DicTrainingMethod";
import { Course } from "./tsadv$Course";
import { DicLearningType } from "./tsadv$DicLearningType";
import { PartyExt } from "./base$PartyExt";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { DicBudgetStatus } from "./tsadv$DicBudgetStatus";
import { BudgetHeader } from "./tsadv$BudgetHeader";
import { DicCity } from "./base$DicCity";
import { DicBudgetItem } from "./tsadv$DicBudgetItem";
import { BudgetRequestItem } from "./tsadv$BudgetRequestItem";
import { BudgetRequestDetail } from "./tsadv$BudgetRequestDetail";
export class BudgetRequest extends AbstractParentEntity {
  static NAME = "tsadv$BudgetRequest";
  budget?: Budget | null;
  requiredEducation?: DicRequiredEducation | null;
  employeeCategory?: DicEmployeeCategory | null;
  trainingMethod?: DicTrainingMethod | null;
  trainingSubject?: string | null;
  educationOnWork?: boolean | null;
  course?: Course | null;
  courseName?: string | null;
  learningType?: DicLearningType | null;
  employeesCount?: number | null;
  month?: any | null;
  learningCosts?: any | null;
  tripCosts?: any | null;
  providerCompany?: PartyExt | null;
  comment?: string | null;
  initiatorPersonGroup?: PersonGroupExt | null;
  organizationGroup?: OrganizationGroupExt | null;
  status?: DicBudgetStatus | null;
  budgetHeader?: BudgetHeader | null;
  reason?: string | null;
  city?: DicCity | null;
  day?: number | null;
  hour?: number | null;
  businessTripEmployee?: number | null;
  budgetItem?: DicBudgetItem | null;
  budgetRequestItems?: BudgetRequestItem[] | null;
  budgetRequestDetail?: BudgetRequestDetail[] | null;
  calcCourseName?: string | null;
}
export type BudgetRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "budgetRequest-with-items"
  | "budgetRequest.view";
export type BudgetRequestView<
  V extends BudgetRequestViewName
> = V extends "_base"
  ? Pick<
      BudgetRequest,
      | "id"
      | "trainingSubject"
      | "educationOnWork"
      | "courseName"
      | "employeesCount"
      | "month"
      | "learningCosts"
      | "tripCosts"
      | "comment"
      | "reason"
      | "day"
      | "hour"
      | "businessTripEmployee"
      | "calcCourseName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      BudgetRequest,
      | "id"
      | "trainingSubject"
      | "educationOnWork"
      | "courseName"
      | "employeesCount"
      | "month"
      | "learningCosts"
      | "tripCosts"
      | "comment"
      | "reason"
      | "day"
      | "hour"
      | "businessTripEmployee"
      | "calcCourseName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<BudgetRequest, "id">
  : V extends "budgetRequest-with-items"
  ? Pick<
      BudgetRequest,
      | "id"
      | "trainingSubject"
      | "educationOnWork"
      | "courseName"
      | "employeesCount"
      | "month"
      | "learningCosts"
      | "tripCosts"
      | "comment"
      | "reason"
      | "day"
      | "hour"
      | "businessTripEmployee"
      | "calcCourseName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "budgetRequestItems"
      | "budgetHeader"
      | "budget"
      | "initiatorPersonGroup"
    >
  : V extends "budgetRequest.view"
  ? Pick<
      BudgetRequest,
      | "id"
      | "trainingSubject"
      | "educationOnWork"
      | "courseName"
      | "employeesCount"
      | "month"
      | "learningCosts"
      | "tripCosts"
      | "comment"
      | "reason"
      | "day"
      | "hour"
      | "businessTripEmployee"
      | "calcCourseName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requiredEducation"
      | "updateTs"
      | "course"
      | "learningType"
      | "status"
      | "employeeCategory"
      | "providerCompany"
      | "city"
      | "budgetItem"
      | "budget"
    >
  : never;
