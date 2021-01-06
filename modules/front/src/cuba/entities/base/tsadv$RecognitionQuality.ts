import { StandardEntity } from "./sys$StandardEntity";
import { Recognition } from "./tsadv$Recognition";
import { DicQuality } from "./tsadv$DicQuality";
export class RecognitionQuality extends StandardEntity {
  static NAME = "tsadv$RecognitionQuality";
  recognition?: Recognition | null;
  quality?: DicQuality | null;
}
export type RecognitionQualityViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "recognitionQuality.edit";
export type RecognitionQualityView<
  V extends RecognitionQualityViewName
> = V extends "recognitionQuality.edit"
  ? Pick<RecognitionQuality, "id" | "recognition" | "quality">
  : never;
