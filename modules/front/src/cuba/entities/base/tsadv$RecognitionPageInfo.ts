import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { PageInfo } from "./tsadv$PageInfo";
import { RecognitionPojo } from "./tsadv$RecognitionPojo";
export class RecognitionPageInfo extends BaseUuidEntity {
  static NAME = "tsadv$RecognitionPageInfo";
  pageInfo?: PageInfo | null;
  recognitions?: RecognitionPojo | null;
}
export type RecognitionPageInfoViewName = "_base" | "_local" | "_minimal";
export type RecognitionPageInfoView<
  V extends RecognitionPageInfoViewName
> = never;
