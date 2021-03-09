import { StandardEntity } from "./sys$StandardEntity";
import { NewsLike } from "./tsadv_NewsLike";
import { NewsComment } from "./tsadv_NewsComment";
import { FileDescriptor } from "./sys$FileDescriptor";
export class News extends StandardEntity {
  static NAME = "tsadv_News";
  newsLang1?: string | null;
  likes?: NewsLike[] | null;
  comments?: NewsComment[] | null;
  newsLang2?: string | null;
  newsLang3?: string | null;
  titleLang1?: string | null;
  titleLang2?: string | null;
  titleLang3?: string | null;
  isPublished?: boolean | null;
  banner?: FileDescriptor | null;
}
export type NewsViewName = "_base" | "_local" | "_minimal" | "news-edit";
export type NewsView<V extends NewsViewName> = V extends "_base"
  ? Pick<
      News,
      | "id"
      | "newsLang1"
      | "newsLang2"
      | "newsLang3"
      | "titleLang1"
      | "titleLang2"
      | "titleLang3"
      | "isPublished"
    >
  : V extends "_local"
  ? Pick<
      News,
      | "id"
      | "newsLang1"
      | "newsLang2"
      | "newsLang3"
      | "titleLang1"
      | "titleLang2"
      | "titleLang3"
      | "isPublished"
    >
  : V extends "news-edit"
  ? Pick<
      News,
      | "id"
      | "newsLang1"
      | "newsLang2"
      | "newsLang3"
      | "titleLang1"
      | "titleLang2"
      | "titleLang3"
      | "isPublished"
      | "createTs"
      | "banner"
      | "likes"
    >
  : never;
