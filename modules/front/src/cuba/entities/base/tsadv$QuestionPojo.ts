import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { AnswerPojo } from "./tsadv$AnswerPojo";
export class QuestionPojo extends BaseUuidEntity {
  static NAME = "tsadv$QuestionPojo";
  text?: string | null;
  answers?: AnswerPojo | null;
  type?: any | null;
}
export type QuestionPojoViewName = "_minimal" | "_local" | "_base";
export type QuestionPojoView<V extends QuestionPojoViewName> = never;
