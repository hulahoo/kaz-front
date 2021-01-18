import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { RcgQuestionAnswerPojo } from "./tsadv$RcgQuestionAnswerPojo";
export class RcgQuestionPojo extends BaseUuidEntity {
  static NAME = "tsadv$RcgQuestionPojo";
  text?: string | null;
  description?: string | null;
  type?: string | null;
  coins?: any | null;
  answers?: RcgQuestionAnswerPojo | null;
}
export type RcgQuestionPojoViewName = "_base" | "_local" | "_minimal";
export type RcgQuestionPojoView<V extends RcgQuestionPojoViewName> = never;
