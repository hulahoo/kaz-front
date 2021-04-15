import { AbstractParentEntity } from "./AbstractParentEntity";
import { Test } from "./tsadv$Test";
import { Enrollment } from "./tsadv$Enrollment";
import { CourseSection } from "./tsadv$CourseSection";
import { CourseSectionSession } from "./tsadv$CourseSectionSession";
export class CourseSectionAttempt extends AbstractParentEntity {
  static NAME = "tsadv$CourseSectionAttempt";
  attemptDate?: any | null;
  test?: Test | null;
  testResult?: any | null;
  testResultPercent?: any | null;
  timeSpent?: any | null;
  activeAttempt?: boolean | null;
  success?: boolean | null;
  enrollment?: Enrollment | null;
  courseSection?: CourseSection | null;
  courseSectionSession?: CourseSectionSession | null;
  courseSectionFormat?: string | null;
}
export type CourseSectionAttemptViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "course-section-attempt"
  | "courseSectionAttempt.browse"
  | "courseSectionAttempt.course.schedule"
  | "courseSectionAttempt.edit"
  | "courseSectionAttempt.for.check.on.remove"
  | "courseSectionAttempt.for.result"
  | "courseSectionAttempt.lms.test.finish";
export type CourseSectionAttemptView<
  V extends CourseSectionAttemptViewName
> = V extends "_base"
  ? Pick<
      CourseSectionAttempt,
      | "id"
      | "courseSection"
      | "attemptDate"
      | "testResult"
      | "testResultPercent"
      | "timeSpent"
      | "activeAttempt"
      | "success"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      CourseSectionAttempt,
      | "id"
      | "attemptDate"
      | "testResult"
      | "testResultPercent"
      | "timeSpent"
      | "activeAttempt"
      | "success"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<CourseSectionAttempt, "id" | "courseSection">
  : V extends "course-section-attempt"
  ? Pick<
      CourseSectionAttempt,
      | "id"
      | "attemptDate"
      | "testResult"
      | "testResultPercent"
      | "timeSpent"
      | "activeAttempt"
      | "success"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "courseSection"
    >
  : V extends "courseSectionAttempt.browse"
  ? Pick<
      CourseSectionAttempt,
      | "id"
      | "attemptDate"
      | "success"
      | "enrollment"
      | "courseSection"
      | "courseSectionFormat"
      | "activeAttempt"
      | "test"
      | "testResult"
      | "testResultPercent"
      | "timeSpent"
    >
  : V extends "courseSectionAttempt.course.schedule"
  ? Pick<
      CourseSectionAttempt,
      "id" | "enrollment" | "courseSection" | "courseSectionSession"
    >
  : V extends "courseSectionAttempt.edit"
  ? Pick<
      CourseSectionAttempt,
      | "id"
      | "attemptDate"
      | "test"
      | "testResult"
      | "timeSpent"
      | "activeAttempt"
      | "success"
      | "enrollment"
      | "courseSection"
      | "courseSectionFormat"
      | "createTs"
    >
  : V extends "courseSectionAttempt.for.check.on.remove"
  ? Pick<CourseSectionAttempt, "id" | "courseSection" | "enrollment">
  : V extends "courseSectionAttempt.for.result"
  ? Pick<
      CourseSectionAttempt,
      | "id"
      | "courseSection"
      | "enrollment"
      | "testResult"
      | "courseSection"
      | "success"
    >
  : V extends "courseSectionAttempt.lms.test.finish"
  ? Pick<
      CourseSectionAttempt,
      | "id"
      | "attemptDate"
      | "testResult"
      | "testResultPercent"
      | "timeSpent"
      | "activeAttempt"
      | "success"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "test"
      | "enrollment"
    >
  : never;
