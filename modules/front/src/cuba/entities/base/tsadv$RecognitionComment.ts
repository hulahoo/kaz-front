import { StandardEntity } from "./sys$StandardEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { Recognition } from "./tsadv$Recognition";
export class RecognitionComment extends StandardEntity {
  static NAME = "tsadv$RecognitionComment";
  text?: string | null;
  textEn?: string | null;
  textRu?: string | null;
  parentComment?: RecognitionComment | null;
  author?: PersonGroupExt | null;
  recognition?: Recognition | null;
}
export type RecognitionCommentViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "recognitionComment.edit";
export type RecognitionCommentView<
  V extends RecognitionCommentViewName
> = V extends "_local"
  ? Pick<RecognitionComment, "id" | "text" | "textEn" | "textRu">
  : V extends "_base"
  ? Pick<RecognitionComment, "id" | "text" | "textEn" | "textRu">
  : V extends "recognitionComment.edit"
  ? Pick<
      RecognitionComment,
      | "id"
      | "text"
      | "textEn"
      | "textRu"
      | "parentComment"
      | "author"
      | "createTs"
      | "recognition"
    >
  : never;
