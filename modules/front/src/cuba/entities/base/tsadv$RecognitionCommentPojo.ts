import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { PersonPojo } from "./tsadv$PersonPojo";
export class RecognitionCommentPojo extends BaseUuidEntity {
  static NAME = "tsadv$RecognitionCommentPojo";
  author?: PersonPojo | null;
  createDate?: string | null;
  text?: string | null;
  reverseText?: string | null;
  translated?: number | null;
  recognitionId?: any | null;
  parentCommentId?: any | null;
  parentCommentAuthor?: PersonPojo | null;
}
export type RecognitionCommentPojoViewName = "_minimal" | "_local" | "_base";
export type RecognitionCommentPojoView<
  V extends RecognitionCommentPojoViewName
> = never;
