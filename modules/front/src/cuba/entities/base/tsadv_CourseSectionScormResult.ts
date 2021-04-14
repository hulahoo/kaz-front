import { StandardEntity } from "./sys$StandardEntity";
import { CourseSectionAttempt } from "./tsadv$CourseSectionAttempt";
import { ScormQuestionMapping } from "./tsadv_ScormQuestionMapping";
export class CourseSectionScormResult extends StandardEntity {
  static NAME = "tsadv_CourseSectionScormResult";
  courseSectionAttempt?: CourseSectionAttempt | null;
  question?: ScormQuestionMapping | null;
  answerTimeStamp?: any | null;
  answer?: string | null;
  isCorrect?: boolean | null;
  score?: any | null;
  maxScore?: any | null;
  minScore?: any | null;
}
export type CourseSectionScormResultViewName = "_base" | "_local" | "_minimal";
export type CourseSectionScormResultView<
  V extends CourseSectionScormResultViewName
> = V extends "_base"
  ? Pick<
      CourseSectionScormResult,
      | "id"
      | "answerTimeStamp"
      | "answer"
      | "isCorrect"
      | "score"
      | "maxScore"
      | "minScore"
    >
  : V extends "_local"
  ? Pick<
      CourseSectionScormResult,
      | "id"
      | "answerTimeStamp"
      | "answer"
      | "isCorrect"
      | "score"
      | "maxScore"
      | "minScore"
    >
  : never;
