import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class AnswerPojo extends BaseUuidEntity {
  static NAME = "tsadv$AnswerPojo";
  answer?: string | null;
  checked?: boolean | null;
}
export type AnswerPojoViewName = "_base" | "_local" | "_minimal";
export type AnswerPojoView<V extends AnswerPojoViewName> = never;
