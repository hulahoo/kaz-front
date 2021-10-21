import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { PartyExt } from "./base$PartyExt";
import { CourseTrainer } from "./tsadv$CourseTrainer";
import { CourseTrainerAssessment } from "./tsadv$CourseTrainerAssessment";
import { DicCompany } from "./base_DicCompany";
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
  informationTrainer?: string | null;
  trainerGreeting?: string | null;
  informationTrainerLang2?: string | null;
  informationTrainerLang3?: string | null;
  trainerGreetingLang2?: string | null;
  trainerGreetingLang3?: string | null;
  company?: DicCompany | null;
  informationTrainerLang?: string | null;
  trainerGreetingLang?: string | null;
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
      | "informationTrainer"
      | "trainerGreeting"
      | "informationTrainerLang2"
      | "informationTrainerLang3"
      | "trainerGreetingLang2"
      | "trainerGreetingLang3"
      | "informationTrainerLang"
      | "trainerGreetingLang"
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
      | "informationTrainer"
      | "trainerGreeting"
      | "informationTrainerLang2"
      | "informationTrainerLang3"
      | "trainerGreetingLang2"
      | "trainerGreetingLang3"
      | "informationTrainerLang"
      | "trainerGreetingLang"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<Trainer, "id" | "trainerFullName">
  : V extends "course-trainer-info"
  ? Pick<
      Trainer,
      | "id"
      | "employee"
      | "courseTrainer"
      | "trainerGreetingLang"
      | "informationTrainerLang"
    >
  : V extends "trainer.browse"
  ? Pick<
      Trainer,
      | "id"
      | "addPaymentAmount"
      | "orderNumber"
      | "orderDate"
      | "informationTrainer"
      | "trainerGreeting"
      | "informationTrainerLang2"
      | "informationTrainerLang3"
      | "trainerGreetingLang2"
      | "trainerGreetingLang3"
      | "informationTrainerLang"
      | "trainerGreetingLang"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "employee"
      | "party"
      | "company"
    >
  : V extends "trainer.edit"
  ? Pick<
      Trainer,
      | "id"
      | "addPaymentAmount"
      | "orderNumber"
      | "orderDate"
      | "informationTrainer"
      | "trainerGreeting"
      | "informationTrainerLang2"
      | "informationTrainerLang3"
      | "trainerGreetingLang2"
      | "trainerGreetingLang3"
      | "informationTrainerLang"
      | "trainerGreetingLang"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "employee"
      | "party"
      | "courseTrainerAssessment"
      | "courseTrainer"
      | "company"
    >
  : never;
