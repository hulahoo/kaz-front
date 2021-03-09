import { AbstractParentEntity } from "./AbstractParentEntity";
import { Course } from "./tsadv$Course";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { CertificationEnrollment } from "./tsadv$CertificationEnrollment";
import { DicReasonForLearning } from "./tsadv$DicReasonForLearning";
import { CourseSchedule } from "./tsadv_CourseSchedule";
export class Enrollment extends AbstractParentEntity {
  static NAME = "tsadv$Enrollment";
  course?: Course | null;
  personGroup?: PersonGroupExt | null;
  status?: any | null;
  date?: any | null;
  reason?: string | null;
  certificationEnrollment?: CertificationEnrollment | null;
  moneyInBudget?: boolean | null;
  reasonForLearning?: DicReasonForLearning | null;
  courseSchedule?: CourseSchedule | null;
}
export type EnrollmentViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "enrollment-course"
  | "enrollment-course"
  | "enrollment-view"
  | "enrollment.browse"
  | "enrollment.course.schedule"
  | "enrollment.for.course"
  | "enrollment.for.course.card"
  | "enrollment.for.start.test"
  | "enrollment.for.testing"
  | "enrollment.lookup"
  | "enrollment.person"
  | "enrollment.person.lookup"
  | "enrollment.schedule"
  | "enrollment.single.for.course"
  | "enrollment.ss.edit"
  | "enrollment.with.section.course.object"
  | "enrollmentPersonCard";
export type EnrollmentView<V extends EnrollmentViewName> = V extends "_base"
  ? Pick<
      Enrollment,
      | "id"
      | "course"
      | "status"
      | "date"
      | "reason"
      | "moneyInBudget"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Enrollment,
      | "id"
      | "status"
      | "date"
      | "reason"
      | "moneyInBudget"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<Enrollment, "id" | "course">
  : V extends "enrollment-course"
  ? Pick<Enrollment, "id" | "course" | "course">
  : V extends "enrollment-course"
  ? Pick<Enrollment, "id" | "course" | "course">
  : V extends "enrollment-view"
  ? Pick<
      Enrollment,
      | "id"
      | "course"
      | "personGroup"
      | "status"
      | "date"
      | "reason"
      | "certificationEnrollment"
      | "moneyInBudget"
      | "reasonForLearning"
      | "courseSchedule"
    >
  : V extends "enrollment.browse"
  ? Pick<
      Enrollment,
      "id" | "course" | "personGroup" | "status" | "date" | "reason"
    >
  : V extends "enrollment.course.schedule"
  ? Pick<Enrollment, "id" | "course" | "personGroup" | "status">
  : V extends "enrollment.for.course"
  ? Pick<
      Enrollment,
      | "id"
      | "course"
      | "course"
      | "personGroup"
      | "status"
      | "date"
      | "reasonForLearning"
      | "courseSchedule"
    >
  : V extends "enrollment.for.course.card"
  ? Pick<Enrollment, "id" | "course" | "course" | "status">
  : V extends "enrollment.for.start.test"
  ? Pick<Enrollment, "id" | "course" | "course" | "personGroup" | "status">
  : V extends "enrollment.for.testing"
  ? Pick<Enrollment, "id" | "course" | "course" | "personGroup">
  : V extends "enrollment.lookup"
  ? Pick<
      Enrollment,
      | "id"
      | "status"
      | "date"
      | "reason"
      | "moneyInBudget"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "course"
    >
  : V extends "enrollment.person"
  ? Pick<
      Enrollment,
      | "id"
      | "status"
      | "date"
      | "reason"
      | "moneyInBudget"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "personGroup"
    >
  : V extends "enrollment.person.lookup"
  ? Pick<Enrollment, "id" | "course" | "personGroup" | "status" | "date">
  : V extends "enrollment.schedule"
  ? Pick<
      Enrollment,
      | "id"
      | "course"
      | "personGroup"
      | "status"
      | "date"
      | "reason"
      | "certificationEnrollment"
    >
  : V extends "enrollment.single.for.course"
  ? Pick<
      Enrollment,
      | "id"
      | "status"
      | "date"
      | "reason"
      | "moneyInBudget"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "course"
      | "personGroup"
      | "reasonForLearning"
    >
  : V extends "enrollment.ss.edit"
  ? Pick<
      Enrollment,
      "id" | "reason" | "status" | "course" | "date" | "certificationEnrollment"
    >
  : V extends "enrollment.with.section.course.object"
  ? Pick<Enrollment, "id" | "course" | "course">
  : V extends "enrollmentPersonCard"
  ? Pick<
      Enrollment,
      | "id"
      | "status"
      | "date"
      | "reason"
      | "moneyInBudget"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "course"
    >
  : never;
