import { AbstractParentEntity } from "./AbstractParentEntity";
import { GranteesAgreement } from "./tsadv_GranteesAgreement";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class LearningResults extends AbstractParentEntity {
  static NAME = "tsadv_LearningResults";
  granteesAgreement?: GranteesAgreement | null;
  personGroup?: PersonGroupExt | null;
  studyYear?: number | null;
  semester?: string | null;
  averageScore?: any | null;
  scholarship?: any | null;
}
export type LearningResultsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "learningResults.edit";
export type LearningResultsView<
  V extends LearningResultsViewName
> = V extends "_base"
  ? Pick<
      LearningResults,
      | "id"
      | "studyYear"
      | "semester"
      | "averageScore"
      | "scholarship"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      LearningResults,
      | "id"
      | "studyYear"
      | "semester"
      | "averageScore"
      | "scholarship"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "learningResults.edit"
  ? Pick<
      LearningResults,
      | "id"
      | "studyYear"
      | "semester"
      | "averageScore"
      | "scholarship"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "granteesAgreement"
      | "personGroup"
    >
  : never;
