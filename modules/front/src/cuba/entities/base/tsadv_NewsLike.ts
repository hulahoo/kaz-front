import { StandardEntity } from "./sys$StandardEntity";
import { News } from "./tsadv_News";
export class NewsLike extends StandardEntity {
  static NAME = "tsadv_NewsLike";
  newsId?: News | null;
}
export type NewsLikeViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "new-like-edit";
export type NewsLikeView<V extends NewsLikeViewName> = V extends "new-like-edit"
  ? Pick<NewsLike, "id" | "createTs" | "createdBy">
  : never;
