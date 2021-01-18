import { AbstractParentEntity } from "./AbstractParentEntity";
import { QuestionBank } from "./tsadv$QuestionBank";
import { Answer } from "./tsadv$Answer";
export class Question extends AbstractParentEntity {
  static NAME = "tsadv$Question";
  bank?: QuestionBank | null;
  text?: string | null;
  type?: any | null;
  score?: number | null;
  answers?: Answer[] | null;
}
export type QuestionViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "question.edit"
  | "question.for.test.online";
export type QuestionView<V extends QuestionViewName> = V extends "_base"
  ? Pick<
      Question,
      | "id"
      | "text"
      | "type"
      | "score"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Question,
      | "id"
      | "text"
      | "type"
      | "score"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "question.edit"
  ? Pick<Question, "id" | "text" | "type" | "score" | "answers">
  : V extends "question.for.test.online"
  ? Pick<Question, "id" | "bank" | "text" | "type" | "answers">
  : never;
