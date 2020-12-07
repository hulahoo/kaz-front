import { StandardEntity } from "./sys$StandardEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class RecognitionProfileSetting extends StandardEntity {
  static NAME = "tsadv$RecognitionProfileSetting";
  automaticTranslate?: boolean | null;
  personGroup?: PersonGroupExt | null;
}
export type RecognitionProfileSettingViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "recognitionProfileSetting.edit";
export type RecognitionProfileSettingView<
  V extends RecognitionProfileSettingViewName
> = V extends "_local"
  ? Pick<RecognitionProfileSetting, "id" | "automaticTranslate">
  : V extends "_base"
  ? Pick<RecognitionProfileSetting, "id" | "automaticTranslate">
  : V extends "recognitionProfileSetting.edit"
  ? Pick<RecognitionProfileSetting, "id" | "automaticTranslate" | "personGroup">
  : never;
