import { AbstractParentEntity } from "./AbstractParentEntity";
import { Course } from "./tsadv$Course";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { CertificationEnrollment } from "./tsadv$CertificationEnrollment";
import { DicReasonForLearning } from "./tsadv$DicReasonForLearning";
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
}
export type EnrollmentViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "enrollment.browse"
  | "enrollment.ss.edit"
  | "enrollmentPersonCard"
  | "enrollment-view"
  | "enrollment.schedule"
  | "enrollment.course.schedule"
  | "enrollment.for.course"
  | "enrollment.single.for.course"
  | "enrollment.lookup"
  | "enrollment.person.lookup"
  | "enrollment.person"
  | "enrollment.for.course.card"
  | "enrollment.for.start.test"
  | "enrollment.for.testing"
  | "enrollment.with.section.course.object";
export type EnrollmentView<V extends EnrollmentViewName> = V extends "_minimal"
  ? Pick<Enrollment, "id" | "course">
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
  : V extends "_base"
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
  : V extends "enrollment.browse"
  ? Pick<
      Enrollment,
      "id" | "course" | "personGroup" | "status" | "date" | "reason"
    >
  : V extends "enrollment.ss.edit"
  ? Pick<
      Enrollment,
      "id" | "reason" | "status" | "course" | "date" | "certificationEnrollment"
    >
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
    >
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
  : V extends "enrollment.course.schedule"
  ? Pick<Enrollment, "id" | "course" | "personGroup" | "status">
  : V extends "enrollment.for.course"
  ? Pick<
      Enrollment,
      "id" | "course" | "personGroup" | "status" | "reasonForLearning"
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
  : V extends "enrollment.person.lookup"
  ? Pick<Enrollment, "id" | "course" | "personGroup" | "status" | "date">
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
  : V extends "enrollment.for.course.card"
  ? Pick<Enrollment, "id" | "course" | "course" | "status">
  : V extends "enrollment.for.start.test"
  ? Pick<Enrollment, "id" | "course" | "course" | "personGroup" | "status">
  : V extends "enrollment.for.testing"
  ? Pick<Enrollment, "id" | "course" | "course" | "personGroup">
  : V extends "enrollment.with.section.course.object"
  ? Pick<Enrollment, "id" | "course" | "course">
  : never;
