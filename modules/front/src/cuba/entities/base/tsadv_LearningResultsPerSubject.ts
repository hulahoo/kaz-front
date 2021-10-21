import { AbstractParentEntity } from "./AbstractParentEntity";
import { LearningResults } from "./tsadv_LearningResults";
export class LearningResultsPerSubject extends AbstractParentEntity {
  static NAME = "tsadv_LearningResultsPerSubject";
  learningResult?: LearningResults | null;
  subject?: string | null;
  score?: any | null;
}
export type LearningResultsPerSubjectViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "learningResultsPerSubject.edit";
export type LearningResultsPerSubjectView<
  V extends LearningResultsPerSubjectViewName
> = V extends "_base"
  ? Pick<
      LearningResultsPerSubject,
      | "id"
      | "subject"
      | "score"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      LearningResultsPerSubject,
      | "id"
      | "subject"
      | "score"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "learningResultsPerSubject.edit"
  ? Pick<
      LearningResultsPerSubject,
      | "id"
      | "subject"
      | "score"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "learningResult"
    >
  : never;
