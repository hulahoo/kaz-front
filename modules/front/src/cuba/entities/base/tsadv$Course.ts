import { AbstractParentEntity } from "./AbstractParentEntity";
import { CourseFeedbackTemplate } from "./tsadv$CourseFeedbackTemplate";
import { PartyExt } from "./base$PartyExt";
import { DicCategory } from "./tsadv$DicCategory";
import { CourseSection } from "./tsadv$CourseSection";
import { CourseCompetence } from "./tsadv$CourseCompetence";
import { CoursePreRequisition } from "./tsadv$CoursePreRequisition";
import { DicLearningType } from "./tsadv$DicLearningType";
import {CourseTrainer} from "./tsadv$CourseTrainer";
export class Course extends AbstractParentEntity {
  static NAME = "tsadv$Course";
  name?: string | null;
  feedbackTemplates?: CourseFeedbackTemplate[] | null;
  party?: PartyExt | null;
  description?: string | null;
  logo?: any | null;
  category?: DicCategory | null;
  targetAudience?: string | null;
  activeFlag?: boolean | null;
  sections?: CourseSection[] | null;
  shortDescription?: string | null;
  competences?: CourseCompetence[] | null;
  preRequisition?: CoursePreRequisition[] | null;
  avgRate?: any | null;
  selfEnrollment?: boolean | null;
  completed?: boolean | null;
  learningType?: DicLearningType | null;
  courseTrainers?: CourseTrainer[] | null;
  educationPeriod?: number | any;
  educationDuration?: number | any;
}
export type CourseViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "course.browse"
  | "course.edit"
  | "course.edit.new"
  | "course.tree";
export type CourseView<V extends CourseViewName> = V extends "_base"
  ? Pick<
      Course,
      | "id"
      | "name"
      | "description"
      | "logo"
      | "targetAudience"
      | "activeFlag"
      | "shortDescription"
      | "selfEnrollment"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Course,
      | "id"
      | "name"
      | "description"
      | "logo"
      | "targetAudience"
      | "activeFlag"
      | "shortDescription"
      | "selfEnrollment"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<Course, "id" | "name">
  : V extends "course.browse"
  ? Pick<
      Course,
      | "id"
      | "name"
      | "description"
      | "logo"
      | "category"
      | "targetAudience"
      | "activeFlag"
      | "selfEnrollment"
      | "learningType"
      | "party"
      | "shortDescription"
    >
  : V extends "course.edit"
  ? Pick<
      Course,
      | "id"
      | "name"
      | "description"
      | "logo"
      | "category"
      | "targetAudience"
      | "activeFlag"
      | "sections"
      | "shortDescription"
      | "competences"
      | "preRequisition"
      | "selfEnrollment"
    >
  : V extends "course.edit.new"
  ? Pick<
      Course,
      | "id"
      | "name"
      | "description"
      | "logo"
      | "category"
      | "targetAudience"
      | "activeFlag"
      | "sections"
      | "shortDescription"
      | "competences"
      | "preRequisition"
      | "avgRate"
      | "selfEnrollment"
      | "learningType"
      | "party"
      | "feedbackTemplates"
    >
  : V extends "course.tree"
  ? Pick<
      Course,
      | "id"
      | "name"
      | "description"
      | "logo"
      | "category"
      | "targetAudience"
      | "activeFlag"
      | "sections"
      | "shortDescription"
      | "competences"
      | "selfEnrollment"
    >
  : never;
