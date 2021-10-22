import { AbstractParentEntity } from "./AbstractParentEntity";
import { Question } from "./tsadv$Question";
import {FileDescriptor} from "./sys$FileDescriptor";
export class Answer extends AbstractParentEntity {
  static NAME = "tsadv$Answer";
  answer?: string | null;
  correct?: boolean | null;
  question?: Question | null;
  image?: FileDescriptor | null;
}
export type AnswerViewName = "_base" | "_local" | "_minimal" | "answer.edit";
export type AnswerView<V extends AnswerViewName> = V extends "_base"
  ? Pick<
      Answer,
      | "id"
      | "answer"
      | "correct"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
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
