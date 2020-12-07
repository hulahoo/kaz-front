import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { Enrollment } from "./tsadv$Enrollment";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { Test } from "./tsadv$Test";
import { CourseSection } from "./tsadv$CourseSection";
import { Course } from "./tsadv$Course";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
export class AssignedTestEnrollment extends BaseUuidEntity {
  static NAME = "tsadv$AssignedTestEnrollment";
  enrollment?: Enrollment | null;
  personGroup?: PersonGroupExt | null;
  fullName?: string | null;
  organizationNameLang1?: string | null;
  positionNameLang1?: string | null;
  test?: Test | null;
  testName?: string | null;
  enrollmentStatus?: any | null;
  success?: boolean | null;
  attempts?: number | null;
  testResult?: number | null;
  courseSection?: CourseSection | null;
  course?: Course | null;
  sectionName?: string | null;
  organization?: OrganizationGroupExt | null;
  createdBy?: string | null;
}
export type AssignedTestEnrollmentViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "assignedTestEnrollment.browse";
export type AssignedTestEnrollmentView<
  V extends AssignedTestEnrollmentViewName
> = V extends "_minimal"
  ? Pick<AssignedTestEnrollment, "id" | "fullName" | "testName">
  : V extends "_local"
  ? Pick<
      AssignedTestEnrollment,
      | "id"
      | "fullName"
      | "organizationNameLang1"
      | "positionNameLang1"
      | "testName"
      | "enrollmentStatus"
      | "success"
      | "attempts"
      | "testResult"
      | "sectionName"
      | "createdBy"
    >
  : V extends "_base"
  ? Pick<
      AssignedTestEnrollment,
      | "id"
      | "fullName"
      | "testName"
      | "organizationNameLang1"
      | "positionNameLang1"
      | "enrollmentStatus"
      | "success"
      | "attempts"
      | "testResult"
      | "sectionName"
      | "createdBy"
    >
  : V extends "assignedTestEnrollment.browse"
  ? Pick<
      AssignedTestEnrollment,
      | "id"
      | "fullName"
      | "testName"
      | "enrollmentStatus"
      | "courseSection"
      | "enrollment"
      | "testName"
      | "organizationNameLang1"
      | "positionNameLang1"
      | "success"
      | "testResult"
      | "sectionName"
      | "createdBy"
      | "test"
    >
  : never;
