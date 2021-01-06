import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { PersonPojo } from "./tsadv$PersonPojo";
import { RecognitionCommentPojo } from "./tsadv$RecognitionCommentPojo";
import { RecognitionTypePojo } from "./tsadv$RecognitionTypePojo";
import { QualityPojo } from "./tsadv$QualityPojo";
export class RecognitionPojo extends BaseUuidEntity {
  static NAME = "tsadv$RecognitionPojo";
  sender?: PersonPojo | null;
  lastComments?: RecognitionCommentPojo | null;
  text?: string | null;
  reverseText?: string | null;
  receiver?: PersonPojo | null;
  createDate?: string | null;
  say?: string | null;
  likeCount?: any | null;
  commentCount?: any | null;
  commentPages?: any | null;
  type?: RecognitionTypePojo | null;
  currentLike?: number | null;
  translated?: number | null;
  qualities?: QualityPojo | null;
  teamLiker?: PersonPojo | null;
}
export type RecognitionPojoViewName = "_base" | "_local" | "_minimal";
export type RecognitionPojoView<V extends RecognitionPojoViewName> = never;
