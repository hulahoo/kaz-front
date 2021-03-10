import { StandardEntity } from "./sys$StandardEntity";
import { News } from "./tsadv_News";
export class NewsComment extends StandardEntity {
  static NAME = "tsadv_NewsComment";
  newsid?: News | null;
  commentLang1?: string | null;
  commentLang2?: string | null;
  commentLang3?: string | null;
}
export type NewsCommentViewName = "_base" | "_local" | "_minimal";
export type NewsCommentView<V extends NewsCommentViewName> = V extends "_base"
  ? Pick<NewsComment, "id" | "commentLang1" | "commentLang2" | "commentLang3">
  : V extends "_local"
  ? Pick<NewsComment, "id" | "commentLang1" | "commentLang2" | "commentLang3">
  : never;
