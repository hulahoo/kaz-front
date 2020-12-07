import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonQuestionnaire } from "./tsadv$PersonQuestionnaire";
import { QuestionnaireQuestion } from "./tsadv$QuestionnaireQuestion";
import { QuestionAnswer } from "./tsadv$QuestionAnswer";
export class PersonQuestionnaireAnswer extends AbstractParentEntity {
  static NAME = "tsadv$PersonQuestionnaireAnswer";
  personQuestionnaire?: PersonQuestionnaire | null;
  question?: QuestionnaireQuestion | null;
  answer?: QuestionAnswer | null;
  score?: number | null;
  textAnswer?: string | null;
}
export type PersonQuestionnaireAnswerViewName = "_minimal" | "_local" | "_base";
export type PersonQuestionnaireAnswerView<
  V extends PersonQuestionnaireAnswerViewName
> = V extends "_local"
  ? Pick<
      PersonQuestionnaireAnswer,
      | "id"
      | "score"
      | "textAnswer"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      PersonQuestionnaireAnswer,
      | "id"
      | "score"
      | "textAnswer"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
