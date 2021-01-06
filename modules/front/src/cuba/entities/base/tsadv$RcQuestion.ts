import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicRcQuestionCategory } from "./tsadv$DicRcQuestionCategory";
import { DicRcQuestionAccessibility } from "./tsadv$DicRcQuestionAccessibility";
import { RcAnswer } from "./tsadv$RcAnswer";
export class RcQuestion extends AbstractParentEntity {
  static NAME = "tsadv$RcQuestion";
  questionType?: any | null;
  answerType?: any | null;
  questionText1?: string | null;
  questionText2?: string | null;
  questionText3?: string | null;
  questionText4?: string | null;
  questionText5?: string | null;
  isActive?: boolean | null;
  questionCategory?: DicRcQuestionCategory | null;
  questionAccessibility?: DicRcQuestionAccessibility | null;
  answers?: RcAnswer[] | null;
  questionText?: string | null;
}
export type RcQuestionViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "rcQuestion.view";
export type RcQuestionView<V extends RcQuestionViewName> = V extends "_base"
  ? Pick<
      RcQuestion,
      | "id"
      | "questionType"
      | "answerType"
      | "questionText1"
      | "questionText2"
      | "questionText3"
      | "questionText4"
      | "questionText5"
      | "isActive"
      | "questionText"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      RcQuestion,
      | "id"
      | "questionType"
      | "answerType"
      | "questionText1"
      | "questionText2"
      | "questionText3"
      | "questionText4"
      | "questionText5"
      | "isActive"
      | "questionText"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<RcQuestion, "id">
  : V extends "rcQuestion.view"
  ? Pick<
      RcQuestion,
      | "id"
      | "questionType"
      | "answerType"
      | "questionText1"
      | "questionText2"
      | "questionText3"
      | "questionText4"
      | "questionText5"
      | "isActive"
      | "questionText"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "questionCategory"
      | "questionAccessibility"
      | "answers"
    >
  : never;
