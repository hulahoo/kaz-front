import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class DicRcgFeedbackTypePojo extends BaseUuidEntity {
  static NAME = "tsadv$DicRcgFeedbackTypePojo";
  name?: string | null;
  imageId?: string | null;
  image?: string | null;
}
export type DicRcgFeedbackTypePojoViewName = "_base" | "_local" | "_minimal";
export type DicRcgFeedbackTypePojoView<
  V extends DicRcgFeedbackTypePojoViewName
> = V extends "_base"
  ? Pick<DicRcgFeedbackTypePojo, "id" | "name">
  : V extends "_minimal"
  ? Pick<DicRcgFeedbackTypePojo, "id" | "name">
  : never;
