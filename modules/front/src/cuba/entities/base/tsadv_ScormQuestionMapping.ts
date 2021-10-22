import { AbstractParentEntity } from "./AbstractParentEntity";
import { LearningObject } from "./tsadv$LearningObject";
export class ScormQuestionMapping extends AbstractParentEntity {
  static NAME = "tsadv_ScormQuestionMapping";
  learningObject?: LearningObject | null;
  code?: string | null;
  question?: string | null;
}
export type ScormQuestionMappingViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "scormQuestionMapping.edit";
export type ScormQuestionMappingView<
  V extends ScormQuestionMappingViewName
> = V extends "_base"
  ? Pick<
      ScormQuestionMapping,
      | "id"
      | "code"
      | "question"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      ScormQuestionMapping,
      | "id"
      | "code"
      | "question"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "scormQuestionMapping.edit"
  ? Pick<
      ScormQuestionMapping,
      | "id"
      | "code"
      | "question"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "learningObject"
    >
  : never;
