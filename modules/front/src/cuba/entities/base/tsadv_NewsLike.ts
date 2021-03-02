import { StandardEntity } from "./sys$StandardEntity";
import { News } from "./tsadv_News";
export class NewsLike extends StandardEntity {
  static NAME = "tsadv_NewsLike";
  newsId?: News | null;
}
export type NewsLikeViewName = "_base" | "_local" | "_minimal";
export type NewsLikeView<V extends NewsLikeViewName> = never;
