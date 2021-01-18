import { StandardEntity } from "./sys$StandardEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { Recognition } from "./tsadv$Recognition";
export class RecognitionLike extends StandardEntity {
  static NAME = "tsadv$RecognitionLike";
  personGroup?: PersonGroupExt | null;
  recognition?: Recognition | null;
}
export type RecognitionLikeViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "recognitionLike.edit";
export type RecognitionLikeView<
  V extends RecognitionLikeViewName
> = V extends "recognitionLike.edit"
  ? Pick<RecognitionLike, "id" | "personGroup">
  : never;
