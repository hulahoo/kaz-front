import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { PageInfo } from "./tsadv$PageInfo";
import { RcgFeedbackPojo } from "./tsadv$RcgFeedbackPojo";
export class RcgFeedbackPageInfo extends BaseUuidEntity {
  static NAME = "tsadv$RcgFeedbackPageInfo";
  pageInfo?: PageInfo | null;
  feedback?: RcgFeedbackPojo | null;
}
export type RcgFeedbackPageInfoViewName = "_minimal" | "_local" | "_base";
export type RcgFeedbackPageInfoView<
  V extends RcgFeedbackPageInfoViewName
> = never;
