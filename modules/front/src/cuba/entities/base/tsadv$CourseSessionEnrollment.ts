import { AbstractParentEntity } from "./AbstractParentEntity";
import { Enrollment } from "./tsadv$Enrollment";
import { CourseSectionSession } from "./tsadv$CourseSectionSession";
export class CourseSessionEnrollment extends AbstractParentEntity {
  static NAME = "tsadv$CourseSessionEnrollment";
  enrollment?: Enrollment | null;
  courseSession?: CourseSectionSession | null;
  enrollmentDate?: any | null;
  status?: any | null;
  comment?: string | null;
}
export type CourseSessionEnrollmentViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "courseSessionEnrollment.edit";
export type CourseSessionEnrollmentView<
  V extends CourseSessionEnrollmentViewName
> = V extends "_base"
  ? Pick<
      CourseSessionEnrollment,
      | "id"
      | "enrollmentDate"
      | "status"
      | "comment"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      CourseSessionEnrollment,
      | "id"
      | "enrollmentDate"
      | "status"
      | "comment"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "courseSessionEnrollment.edit"
  ? Pick<
      CourseSessionEnrollment,
      | "id"
      | "enrollmentDate"
      | "status"
      | "comment"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "enrollment"
    >
  : never;
