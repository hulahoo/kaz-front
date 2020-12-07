import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicLearningObjectType } from "./tsadv$DicLearningObjectType";
import { LearningObject } from "./tsadv$LearningObject";
import { Test } from "./tsadv$Test";
export class CourseSectionObject extends AbstractParentEntity {
  static NAME = "tsadv$CourseSectionObject";
  objectType?: DicLearningObjectType | null;
  content?: LearningObject | null;
  test?: Test | null;
}
export type CourseSectionObjectViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "courseSectionObject.edit";
export type CourseSectionObjectView<
  V extends CourseSectionObjectViewName
> = V extends "_local"
  ? Pick<
      CourseSectionObject,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      CourseSectionObject,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "courseSectionObject.edit"
  ? Pick<CourseSectionObject, "id" | "objectType" | "content" | "test">
  : never;
