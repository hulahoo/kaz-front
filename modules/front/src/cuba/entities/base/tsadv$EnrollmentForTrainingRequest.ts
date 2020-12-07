import { StandardEntity } from "./sys$StandardEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { TrainingRequest } from "./tsadv$TrainingRequest";
export class EnrollmentForTrainingRequest extends StandardEntity {
  static NAME = "tsadv$EnrollmentForTrainingRequest";
  reason?: string | null;
  personGroup?: PersonGroupExt | null;
  status?: any | null;
  date?: any | null;
  moneyInBudget?: boolean | null;
  trainingRequest?: TrainingRequest | null;
}
export type EnrollmentForTrainingRequestViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "enrollmentForTrainingRequest-view";
export type EnrollmentForTrainingRequestView<
  V extends EnrollmentForTrainingRequestViewName
> = V extends "_local"
  ? Pick<
      EnrollmentForTrainingRequest,
      "id" | "reason" | "status" | "date" | "moneyInBudget"
    >
  : V extends "_base"
  ? Pick<
      EnrollmentForTrainingRequest,
      "id" | "reason" | "status" | "date" | "moneyInBudget"
    >
  : V extends "enrollmentForTrainingRequest-view"
  ? Pick<
      EnrollmentForTrainingRequest,
      | "id"
      | "reason"
      | "status"
      | "date"
      | "moneyInBudget"
      | "personGroup"
      | "trainingRequest"
    >
  : never;
