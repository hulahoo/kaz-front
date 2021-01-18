import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicRecognitionType } from "./tsadv$DicRecognitionType";
import { RecognitionComment } from "./tsadv$RecognitionComment";
import { RecognitionLike } from "./tsadv$RecognitionLike";
import { RecognitionQuality } from "./tsadv$RecognitionQuality";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class Recognition extends AbstractParentEntity {
  static NAME = "tsadv$Recognition";
  recognitionType?: DicRecognitionType | null;
  notifyManager?: boolean | null;
  comments?: RecognitionComment[] | null;
  likes?: RecognitionLike[] | null;
  recognitionQualities?: RecognitionQuality[] | null;
  recognitionDate?: any | null;
  comment?: string | null;
  commentEn?: string | null;
  commentRu?: string | null;
  coins?: any | null;
  author?: PersonGroupExt | null;
  receiver?: PersonGroupExt | null;
}
export type RecognitionViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "recognition.browse"
  | "recognition.edit";
export type RecognitionView<V extends RecognitionViewName> = V extends "_base"
  ? Pick<
      Recognition,
      | "id"
      | "recognitionType"
      | "notifyManager"
      | "recognitionDate"
      | "comment"
      | "commentEn"
      | "commentRu"
      | "coins"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Recognition,
      | "id"
      | "notifyManager"
      | "recognitionDate"
      | "comment"
      | "commentEn"
      | "commentRu"
      | "coins"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<Recognition, "id" | "recognitionType">
  : V extends "recognition.browse"
  ? Pick<
      Recognition,
      | "id"
      | "notifyManager"
      | "recognitionDate"
      | "comment"
      | "commentEn"
      | "commentRu"
      | "coins"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "recognitionType"
      | "author"
      | "receiver"
    >
  : V extends "recognition.edit"
  ? Pick<
      Recognition,
      | "id"
      | "notifyManager"
      | "recognitionDate"
      | "comment"
      | "commentEn"
      | "commentRu"
      | "coins"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "recognitionType"
      | "recognitionQualities"
      | "author"
      | "receiver"
      | "comments"
      | "likes"
    >
  : never;
