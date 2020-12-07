import { AbstractParentEntity } from "./AbstractParentEntity";
import { Trainer } from "./tsadv$Trainer";
import { Course } from "./tsadv$Course";
export class CourseTrainer extends AbstractParentEntity {
  static NAME = "tsadv$CourseTrainer";
  trainer?: Trainer | null;
  course?: Course | null;
  dateFrom?: any | null;
  dateTo?: any | null;
}
export type CourseTrainerViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "courseTrainer.edit";
export type CourseTrainerView<
  V extends CourseTrainerViewName
> = V extends "_local"
  ? Pick<
      CourseTrainer,
      | "id"
      | "dateFrom"
      | "dateTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      CourseTrainer,
      | "id"
      | "dateFrom"
      | "dateTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "courseTrainer.edit"
  ? Pick<
      CourseTrainer,
      | "id"
      | "dateFrom"
      | "dateTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "trainer"
      | "course"
    >
  : never;
