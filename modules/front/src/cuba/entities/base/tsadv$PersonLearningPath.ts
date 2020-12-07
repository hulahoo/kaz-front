import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { LearningPath } from "./tsadv$LearningPath";
export class PersonLearningPath extends AbstractParentEntity {
  static NAME = "tsadv$PersonLearningPath";
  personGroup?: PersonGroupExt | null;
  learningPath?: LearningPath | null;
}
export type PersonLearningPathViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "personLearningPath.browse";
export type PersonLearningPathView<
  V extends PersonLearningPathViewName
> = V extends "_local"
  ? Pick<
      PersonLearningPath,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      PersonLearningPath,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "personLearningPath.browse"
  ? Pick<PersonLearningPath, "id" | "personGroup" | "learningPath">
  : never;
