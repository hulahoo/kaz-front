import { AbstractParentEntity } from "./AbstractParentEntity";
import { Question } from "./tsadv$Question";
export class Answer extends AbstractParentEntity {
  static NAME = "tsadv$Answer";
  answer?: string | null;
  correct?: boolean | null;
  question?: Question | null;
}
export type AnswerViewName = "_minimal" | "_local" | "_base" | "answer.edit";
export type AnswerView<V extends AnswerViewName> = V extends "_local"
  ? Pick<
      Answer,
      | "id"
      | "answer"
      | "correct"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      Answer,
      | "id"
      | "answer"
      | "correct"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "answer.edit"
  ? Pick<Answer, "id" | "answer" | "correct">
  : never;
