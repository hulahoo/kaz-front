import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { PartyExt } from "./base$PartyExt";
import { CourseTrainer } from "./tsadv$CourseTrainer";
import { CourseTrainerAssessment } from "./tsadv$CourseTrainerAssessment";
export class Trainer extends AbstractParentEntity {
  static NAME = "tsadv$Trainer";
  employee?: PersonGroupExt | null;
  addPaymentAmount?: number | null;
  orderNumber?: string | null;
  orderDate?: any | null;
  party?: PartyExt | null;
  courseTrainer?: CourseTrainer[] | null;
  courseTrainerAssessment?: CourseTrainerAssessment[] | null;
  trainerFullName?: string | null;
}
export type TrainerViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "course-trainer-info"
  | "trainer.browse"
  | "trainer.edit";
export type TrainerView<V extends TrainerViewName> = V extends "_base"
  ? Pick<
      Trainer,
      | "id"
      | "trainerFullName"
      | "addPaymentAmount"
      | "orderNumber"
      | "orderDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Trainer,
      | "id"
      | "addPaymentAmount"
      | "orderNumber"
      | "orderDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<Trainer, "id" | "trainerFullName">
  : V extends "course-trainer-info"
  ? Pick<Trainer, "id" | "employee" | "courseTrainer">
  : V extends "trainer.browse"
  ? Pick<
      Trainer,
      | "id"
      | "addPaymentAmount"
      | "orderNumber"
      | "orderDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "employee"
      | "party"
    >
  : V extends "trainer.edit"
  ? Pick<
      Trainer,
      | "id"
      | "addPaymentAmount"
      | "orderNumber"
      | "orderDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "employee"
      | "party"
      | "courseTrainerAssessment"
      | "courseTrainer"
    >
  : never;
