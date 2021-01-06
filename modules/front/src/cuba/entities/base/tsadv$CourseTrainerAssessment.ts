import { AbstractParentEntity } from "./AbstractParentEntity";
import { Trainer } from "./tsadv$Trainer";
import { Course } from "./tsadv$Course";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class CourseTrainerAssessment extends AbstractParentEntity {
  static NAME = "tsadv$CourseTrainerAssessment";
  trainer?: Trainer | null;
  course?: Course | null;
  assessmentDate?: any | null;
  assessor?: PersonGroupExt | null;
  score?: any | null;
}
export type CourseTrainerAssessmentViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "courseTrainerAssessment.edit";
export type CourseTrainerAssessmentView<
  V extends CourseTrainerAssessmentViewName
> = V extends "_base"
  ? Pick<
      CourseTrainerAssessment,
      | "id"
      | "assessmentDate"
      | "score"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      CourseTrainerAssessment,
      | "id"
      | "assessmentDate"
      | "score"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "courseTrainerAssessment.edit"
  ? Pick<
      CourseTrainerAssessment,
      | "id"
      | "assessmentDate"
      | "score"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "trainer"
      | "course"
      | "assessor"
    >
  : never;
