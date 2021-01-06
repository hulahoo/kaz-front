import { StandardEntity } from "./sys$StandardEntity";
import { DicLearningType } from "./tsadv$DicLearningType";
import { Course } from "./tsadv$Course";
import { Budget } from "./tsadv$Budget";
import { EnrollmentForTrainingRequest } from "./tsadv$EnrollmentForTrainingRequest";
export class TrainingRequest extends StandardEntity {
  static NAME = "tsadv$TrainingRequest";
  requestNumber?: string | null;
  learningType?: DicLearningType | null;
  course?: Course | null;
  budget?: Budget | null;
  startDate?: any | null;
  endDate?: any | null;
  status?: any | null;
  enrollment?: EnrollmentForTrainingRequest[] | null;
}
export type TrainingRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "trainingRequest-view";
export type TrainingRequestView<
  V extends TrainingRequestViewName
> = V extends "_base"
  ? Pick<
      TrainingRequest,
      "id" | "requestNumber" | "startDate" | "endDate" | "status"
    >
  : V extends "_local"
  ? Pick<
      TrainingRequest,
      "id" | "requestNumber" | "startDate" | "endDate" | "status"
    >
  : V extends "_minimal"
  ? Pick<TrainingRequest, "id" | "requestNumber">
  : V extends "trainingRequest-view"
  ? Pick<
      TrainingRequest,
      | "id"
      | "requestNumber"
      | "startDate"
      | "endDate"
      | "status"
      | "learningType"
      | "course"
      | "budget"
      | "enrollment"
    >
  : never;
