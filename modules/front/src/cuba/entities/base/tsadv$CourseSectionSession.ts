import { AbstractParentEntity } from "./AbstractParentEntity";
import { CourseSessionEnrollment } from "./tsadv$CourseSessionEnrollment";
import { Trainer } from "./tsadv$Trainer";
import { DicLearningCenter } from "./tsadv$DicLearningCenter";
import { CourseSection } from "./tsadv$CourseSection";
export class CourseSectionSession extends AbstractParentEntity {
  static NAME = "tsadv$CourseSectionSession";
  startDate?: any | null;
  courseSessionEnrollmentList?: CourseSessionEnrollment[] | null;
  trainer?: Trainer | null;
  name?: string | null;
  endDate?: any | null;
  learningCenter?: DicLearningCenter | null;
  maxPerson?: number | null;
  courseSection?: CourseSection | null;
}
export type CourseSectionSessionViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "courseSectionSession.browse"
  | "myCourseSectionSession.browse"
  | "myCourseSectionSession.edit"
  | "lms.course.view";
export type CourseSectionSessionView<
  V extends CourseSectionSessionViewName
> = V extends "_local"
  ? Pick<
      CourseSectionSession,
      | "id"
      | "startDate"
      | "name"
      | "endDate"
      | "maxPerson"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      CourseSectionSession,
      | "id"
      | "startDate"
      | "name"
      | "endDate"
      | "maxPerson"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "courseSectionSession.browse"
  ? Pick<
      CourseSectionSession,
      | "id"
      | "startDate"
      | "endDate"
      | "learningCenter"
      | "maxPerson"
      | "courseSection"
      | "name"
      | "courseSessionEnrollmentList"
      | "trainer"
    >
  : V extends "myCourseSectionSession.browse"
  ? Pick<
      CourseSectionSession,
      | "id"
      | "startDate"
      | "name"
      | "endDate"
      | "maxPerson"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "courseSessionEnrollmentList"
      | "courseSection"
      | "trainer"
      | "learningCenter"
    >
  : V extends "myCourseSectionSession.edit"
  ? Pick<
      CourseSectionSession,
      | "id"
      | "startDate"
      | "name"
      | "endDate"
      | "maxPerson"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "courseSessionEnrollmentList"
      | "courseSection"
      | "trainer"
      | "learningCenter"
    >
  : V extends "lms.course.view"
  ? Pick<
      CourseSectionSession,
      | "id"
      | "startDate"
      | "endDate"
      | "learningCenter"
      | "maxPerson"
      | "courseSection"
      | "name"
      | "courseSessionEnrollmentList"
      | "trainer"
      | "courseSessionEnrollmentList"
    >
  : never;
