import { AbstractParentEntity } from "./AbstractParentEntity";
import { InterviewQuestionnaire } from "./tsadv$InterviewQuestionnaire";
import { RcQuestion } from "./tsadv$RcQuestion";
import { InterviewAnswer } from "./tsadv$InterviewAnswer";
export class InterviewQuestion extends AbstractParentEntity {
  static NAME = "tsadv$InterviewQuestion";
  interviewQuestionnaire?: InterviewQuestionnaire | null;
  question?: RcQuestion | null;
  answers?: InterviewAnswer[] | null;
  order?: number | null;
  score?: any | null;
  wholeObject?: InterviewQuestion | null;
}
export type InterviewQuestionViewName = "_minimal" | "_local" | "_base";
export type InterviewQuestionView<
  V extends InterviewQuestionViewName
> = V extends "_minimal"
  ? Pick<InterviewQuestion, "id">
  : V extends "_local"
  ? Pick<
      InterviewQuestion,
      "id" | "order" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      InterviewQuestion,
      "id" | "order" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : never;
