import { AbstractParentEntity } from "./AbstractParentEntity";
import { Course } from "./tsadv$Course";
import { LearningPath } from "./tsadv$LearningPath";
export class LearningPathCourse extends AbstractParentEntity {
  static NAME = "tsadv$LearningPathCourse";
  orderNumber?: number | null;
  course?: Course | null;
  learningPath?: LearningPath | null;
}
export type LearningPathCourseViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "learningPathCourse.card"
  | "learningPathCourse.edit";
export type LearningPathCourseView<
  V extends LearningPathCourseViewName
> = V extends "_base"
  ? Pick<
      LearningPathCourse,
      | "id"
      | "orderNumber"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      LearningPathCourse,
      | "id"
      | "orderNumber"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "learningPathCourse.card"
  ? Pick<LearningPathCourse, "id" | "orderNumber" | "course" | "learningPath">
  : V extends "learningPathCourse.edit"
  ? Pick<LearningPathCourse, "id" | "orderNumber" | "course" | "learningPath">
  : never;
