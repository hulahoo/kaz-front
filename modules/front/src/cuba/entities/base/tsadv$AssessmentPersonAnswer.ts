import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { Question } from "./tsadv$Question";
import { Assessment } from "./tsadv$Assessment";
export class AssessmentPersonAnswer extends AbstractParentEntity {
  static NAME = "tsadv$AssessmentPersonAnswer";
  person?: PersonGroupExt | null;
  question?: Question | null;
  answer?: string | null;
  assessment?: Assessment | null;
}
export type AssessmentPersonAnswerViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "assessmentPersonAnswer-view";
export type AssessmentPersonAnswerView<
  V extends AssessmentPersonAnswerViewName
> = V extends "_base"
  ? Pick<
      AssessmentPersonAnswer,
      "id" | "answer" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      AssessmentPersonAnswer,
      "id" | "answer" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "assessmentPersonAnswer-view"
  ? Pick<
      AssessmentPersonAnswer,
      | "id"
      | "answer"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "person"
      | "question"
    >
  : never;
