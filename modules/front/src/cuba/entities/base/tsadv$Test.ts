import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicTestType } from "./tsadv$DicTestType";
import { TestSection } from "./tsadv$TestSection";
import { JobTest } from "./tsadv$JobTest";
import { PositionTest } from "./tsadv$PositionTest";
import { Course } from "./tsadv$Course";
import { CourseSectionObject } from "./tsadv$CourseSectionObject";
export class Test extends AbstractParentEntity {
  static NAME = "tsadv$Test";
  name?: string | null;
  description?: string | null;
  type?: DicTestType | null;
  active?: boolean | null;
  maxAttempt?: number | null;
  daysBetweenAttempts?: number | null;
  timer?: number | null;
  sectionOrder?: any | null;
  instruction?: string | null;
  targetScore?: number | null;
  showResults?: boolean | null;
  sections?: TestSection[] | null;
  showSectionNewPage?: boolean | null;
  questionPerPage?: number | null;
  jobTest?: JobTest[] | null;
  positionTest?: PositionTest[] | null;
  course?: Course | null;
  courseSectionObjects?: CourseSectionObject[] | null;
}
export type TestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "test.browse"
  | "test.course.lms"
  | "test.edit";
export type TestView<V extends TestViewName> = V extends "_base"
  ? Pick<
      Test,
      | "id"
      | "name"
      | "description"
      | "active"
      | "maxAttempt"
      | "daysBetweenAttempts"
      | "timer"
      | "sectionOrder"
      | "instruction"
      | "targetScore"
      | "showResults"
      | "showSectionNewPage"
      | "questionPerPage"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Test,
      | "id"
      | "name"
      | "description"
      | "active"
      | "maxAttempt"
      | "daysBetweenAttempts"
      | "timer"
      | "sectionOrder"
      | "instruction"
      | "targetScore"
      | "showResults"
      | "showSectionNewPage"
      | "questionPerPage"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<Test, "id" | "name">
  : V extends "test.browse"
  ? Pick<
      Test,
      | "id"
      | "name"
      | "description"
      | "active"
      | "maxAttempt"
      | "daysBetweenAttempts"
      | "timer"
      | "sectionOrder"
      | "instruction"
      | "targetScore"
      | "showResults"
      | "showSectionNewPage"
      | "questionPerPage"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "type"
      | "sections"
      | "jobTest"
      | "positionTest"
      | "course"
    >
  : V extends "test.course.lms"
  ? Pick<
      Test,
      | "id"
      | "name"
      | "description"
      | "active"
      | "maxAttempt"
      | "daysBetweenAttempts"
      | "timer"
      | "sectionOrder"
      | "instruction"
      | "targetScore"
      | "showResults"
      | "showSectionNewPage"
      | "questionPerPage"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "sections"
    >
  : V extends "test.edit"
  ? Pick<
      Test,
      | "id"
      | "name"
      | "description"
      | "type"
      | "active"
      | "maxAttempt"
      | "daysBetweenAttempts"
      | "timer"
      | "sectionOrder"
      | "instruction"
      | "targetScore"
      | "showResults"
      | "sections"
      | "showSectionNewPage"
      | "questionPerPage"
      | "jobTest"
      | "positionTest"
    >
  : never;
