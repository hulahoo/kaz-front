import { AbstractTimeBasedEntity } from "./AbstractTimeBasedEntity";
import { DicCategory } from "./tsadv$DicCategory";
import { LearningPathCourse } from "./tsadv$LearningPathCourse";
export class LearningPath extends AbstractTimeBasedEntity {
  static NAME = "tsadv$LearningPath";
  name?: string | null;
  category?: DicCategory | null;
  description?: string | null;
  courses?: LearningPathCourse[] | null;
  avgRate?: any | null;
  reviewCount?: any | null;
  courseCount?: any | null;
}
export type LearningPathViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "learningPath.browse"
  | "learningPath.edit";
export type LearningPathView<
  V extends LearningPathViewName
> = V extends "_minimal"
  ? Pick<LearningPath, "id" | "name">
  : V extends "_local"
  ? Pick<
      LearningPath,
      | "id"
      | "name"
      | "description"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : V extends "_base"
  ? Pick<
      LearningPath,
      | "id"
      | "name"
      | "description"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : V extends "learningPath.browse"
  ? Pick<
      LearningPath,
      | "id"
      | "name"
      | "category"
      | "description"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : V extends "learningPath.edit"
  ? Pick<
      LearningPath,
      | "id"
      | "name"
      | "category"
      | "description"
      | "courses"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : never;
