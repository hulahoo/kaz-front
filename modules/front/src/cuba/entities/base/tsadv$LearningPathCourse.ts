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
  | "_minimal"
  | "_local"
  | "_base"
  | "learningPathCourse.edit"
  | "learningPathCourse.card";
export type LearningPathCourseView<
  V extends LearningPathCourseViewName
> = V extends "_local"
  ? Pick<
      LearningPathCourse,
      | "id"
      | "orderNumber"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      LearningPathCourse,
      | "id"
      | "orderNumber"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "learningPathCourse.edit"
  ? Pick<LearningPathCourse, "id" | "orderNumber" | "course" | "learningPath">
  : V extends "learningPathCourse.card"
  ? Pick<LearningPathCourse, "id" | "orderNumber" | "course" | "learningPath">
  : never;
