import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class AnswerPojo extends BaseUuidEntity {
  static NAME = "tsadv$AnswerPojo";
  answer?: string | null;
  checked?: boolean | null;
}
export type AnswerPojoViewName = "_minimal" | "_local" | "_base";
export type AnswerPojoView<V extends AnswerPojoViewName> = never;
