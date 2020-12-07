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
  | "_minimal"
  | "_local"
  | "_base"
  | "trainer.edit"
  | "trainer.browse";
export type TrainerView<V extends TrainerViewName> = V extends "_minimal"
  ? Pick<Trainer, "id" | "trainerFullName">
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
  : V extends "_base"
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
  : never;
