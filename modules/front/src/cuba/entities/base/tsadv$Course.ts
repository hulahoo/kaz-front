import { AbstractParentEntity } from "./AbstractParentEntity";
import { Enrollment } from "./tsadv$Enrollment";
import { CourseTrainer } from "./tsadv$CourseTrainer";
import { CourseFeedbackTemplate } from "./tsadv$CourseFeedbackTemplate";
import { PartyExt } from "./base$PartyExt";
import { DicCategory } from "./tsadv$DicCategory";
import { CourseSection } from "./tsadv$CourseSection";
import { CourseCompetence } from "./tsadv$CourseCompetence";
import { CoursePreRequisition } from "./tsadv$CoursePreRequisition";
import { DicLearningType } from "./tsadv$DicLearningType";
import { CourseReview } from "./tsadv$CourseReview";
import { CourseSchedule } from "./tsadv_CourseSchedule";
export class Course extends AbstractParentEntity {
  static NAME = "tsadv$Course";
  name?: string | null;
  isIssuedCertificate?: boolean | null;
  enrollments?: Enrollment[] | null;
  courseTrainers?: CourseTrainer[] | null;
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
  reviews?: CourseReview[] | null;
  isOnline?: boolean | null;
  courseSchedule?: CourseSchedule[] | null;
  educationPeriod?: any | null;
  educationDuration?: any | null;
}
export type CourseViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "course-learning-history"
  | "course-portal-browse"
  | "course.browse"
  | "course.edit"
  | "course.edit.new"
  | "course.tree"
  | "portal-course-edit";
export type CourseView<V extends CourseViewName> = V extends "_base"
  ? Pick<
      Course,
      | "id"
      | "name"
      | "isIssuedCertificate"
      | "description"
      | "logo"
      | "targetAudience"
      | "activeFlag"
      | "shortDescription"
      | "selfEnrollment"
      | "isOnline"
      | "educationPeriod"
      | "educationDuration"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Course,
      | "id"
      | "name"
      | "isIssuedCertificate"
      | "description"
      | "logo"
      | "targetAudience"
      | "activeFlag"
      | "shortDescription"
      | "selfEnrollment"
      | "isOnline"
      | "educationPeriod"
      | "educationDuration"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<Course, "id" | "name">
  : V extends "course-learning-history"
  ? Pick<Course, "id" | "name" | "sections">
  : V extends "course-portal-browse"
  ? Pick<Course, "id" | "name" | "name" | "avgRate" | "logo" | "isOnline">
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
      | "enrollments"
      | "courseTrainers"
      | "feedbackTemplates"
      | "party"
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
      | "isOnline"
      | "courseSchedule"
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
  : V extends "portal-course-edit"
  ? Pick<
      Course,
      | "id"
      | "name"
      | "name"
      | "description"
      | "educationDuration"
      | "educationPeriod"
      | "avgRate"
      | "preRequisition"
      | "courseTrainers"
      | "sections"
      | "logo"
      | "isIssuedCertificate"
      | "reviews"
      | "enrollments"
      | "selfEnrollment"
    >
  : never;
