import { AbstractParentEntity } from "./AbstractParentEntity";
import { Course } from "./tsadv$Course";
import { CourseSectionObject } from "./tsadv$CourseSectionObject";
import { DicCourseFormat } from "./tsadv$DicCourseFormat";
import { CourseSectionSession } from "./tsadv$CourseSectionSession";
import { CourseSectionAttempt } from "./tsadv$CourseSectionAttempt";
export class CourseSection extends AbstractParentEntity {
  static NAME = "tsadv$CourseSection";
  course?: Course | null;
  mandatory?: boolean | null;
  sectionName?: string | null;
  order?: number | null;
  sectionObject?: CourseSectionObject | null;
  format?: DicCourseFormat | null;
  description?: string | null;
  session?: CourseSectionSession[] | null;
  courseSectionAttempts?: CourseSectionAttempt[] | null;
}
export type CourseSectionViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "course.section.for.start.online.section"
  | "course.section.format"
  | "course.section.with.format.session"
  | "courseSection.course.sections"
  | "courseSection.edit"
  | "courseSection.for.status"
  | "courseSection.minimal"
  | "courseSection.object"
  | "enrollment-course-section";
export type CourseSectionView<
  V extends CourseSectionViewName
> = V extends "_base"
  ? Pick<
      CourseSection,
      | "id"
      | "sectionName"
      | "mandatory"
      | "order"
      | "description"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      CourseSection,
      | "id"
      | "mandatory"
      | "sectionName"
      | "order"
      | "description"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<CourseSection, "id" | "sectionName">
  : V extends "course.section.for.start.online.section"
  ? Pick<CourseSection, "id" | "sectionName" | "sectionObject">
  : V extends "course.section.format"
  ? Pick<
      CourseSection,
      | "id"
      | "mandatory"
      | "sectionName"
      | "order"
      | "description"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "format"
    >
  : V extends "course.section.with.format.session"
  ? Pick<
      CourseSection,
      | "id"
      | "mandatory"
      | "sectionName"
      | "order"
      | "description"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "format"
      | "session"
      | "sectionObject"
      | "courseSectionAttempts"
      | "course"
    >
  : V extends "courseSection.course.sections"
  ? Pick<CourseSection, "id" | "sectionName" | "course">
  : V extends "courseSection.edit"
  ? Pick<
      CourseSection,
      | "id"
      | "sectionName"
      | "order"
      | "format"
      | "description"
      | "sectionObject"
      | "session"
      | "course"
      | "mandatory"
    >
  : V extends "courseSection.for.status"
  ? Pick<CourseSection, "id" | "course" | "courseSectionAttempts">
  : V extends "courseSection.minimal"
  ? Pick<CourseSection, "id" | "course" | "format">
  : V extends "courseSection.object"
  ? Pick<CourseSection, "id" | "sectionObject">
  : V extends "enrollment-course-section"
  ? Pick<
      CourseSection,
      | "id"
      | "mandatory"
      | "sectionName"
      | "order"
      | "description"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "courseSectionAttempts"
      | "format"
    >
  : never;
