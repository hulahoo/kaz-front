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
  | "_minimal"
  | "_local"
  | "_base"
  | "courseSection.edit"
  | "courseSection.object"
  | "courseSection.minimal"
  | "courseSection.for.status"
  | "course.section.for.start.online.section"
  | "course.section.format"
  | "course.section.with.format.session";
export type CourseSectionView<
  V extends CourseSectionViewName
> = V extends "_minimal"
  ? Pick<CourseSection, "id" | "sectionName">
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
  : V extends "_base"
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
  : V extends "courseSection.object"
  ? Pick<CourseSection, "id" | "sectionObject">
  : V extends "courseSection.minimal"
  ? Pick<CourseSection, "id" | "course" | "format">
  : V extends "courseSection.for.status"
  ? Pick<CourseSection, "id" | "course" | "courseSectionAttempts">
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
      | "course"
    >
  : never;
