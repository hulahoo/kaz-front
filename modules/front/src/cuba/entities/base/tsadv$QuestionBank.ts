import { AbstractParentEntity } from "./AbstractParentEntity";
import { Question } from "./tsadv$Question";
export class QuestionBank extends AbstractParentEntity {
  static NAME = "tsadv$QuestionBank";
  bankName?: string | null;
  description?: string | null;
  questions?: Question[] | null;
}
export type QuestionBankViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "questionBank.browse"
  | "questionBank.edit";
export type QuestionBankView<V extends QuestionBankViewName> = V extends "_base"
  ? Pick<
      QuestionBank,
      | "id"
      | "bankName"
      | "description"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      QuestionBank,
      | "id"
      | "bankName"
      | "description"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<QuestionBank, "id" | "bankName">
  : V extends "questionBank.browse"
  ? Pick<QuestionBank, "id" | "bankName" | "description">
  : V extends "questionBank.edit"
  ? Pick<QuestionBank, "id" | "bankName" | "description" | "questions">
  : never;
