import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class RcgFaqPojo extends BaseUuidEntity {
  static NAME = "tsadv$RcgFaqPojo";
  order?: number | null;
  title?: string | null;
  content?: string | null;
  code?: string | null;
}
export type RcgFaqPojoViewName = "_base" | "_local" | "_minimal";
export type RcgFaqPojoView<V extends RcgFaqPojoViewName> = V extends "_base"
  ? Pick<RcgFaqPojo, "id" | "title">
  : V extends "_minimal"
  ? Pick<RcgFaqPojo, "id" | "title">
  : never;
