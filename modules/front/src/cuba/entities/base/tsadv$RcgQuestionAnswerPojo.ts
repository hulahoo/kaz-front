import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class RcgQuestionAnswerPojo extends BaseUuidEntity {
  static NAME = "tsadv$RcgQuestionAnswerPojo";
  stringId?: string | null;
  text?: string | null;
  image?: string | null;
}
export type RcgQuestionAnswerPojoViewName = "_base" | "_local" | "_minimal";
export type RcgQuestionAnswerPojoView<
  V extends RcgQuestionAnswerPojoViewName
> = never;
