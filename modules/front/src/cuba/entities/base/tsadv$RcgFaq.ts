import { StandardEntity } from "./sys$StandardEntity";
export class RcgFaq extends StandardEntity {
  static NAME = "tsadv$RcgFaq";
  title?: string | null;
  order?: number | null;
  titleLang1?: string | null;
  titleLang2?: string | null;
  titleLang3?: string | null;
  titleLang4?: string | null;
  titleLang5?: string | null;
  content?: string | null;
  contentLang1?: string | null;
  contentLang2?: string | null;
  contentLang3?: string | null;
  contentLang4?: string | null;
  contentLang5?: string | null;
  code?: string | null;
}
export type RcgFaqViewName = "_base" | "_local" | "_minimal";
export type RcgFaqView<V extends RcgFaqViewName> = V extends "_base"
  ? Pick<
      RcgFaq,
      | "id"
      | "title"
      | "order"
      | "titleLang1"
      | "titleLang2"
      | "titleLang3"
      | "titleLang4"
      | "titleLang5"
      | "contentLang1"
      | "contentLang2"
      | "contentLang3"
      | "contentLang4"
      | "contentLang5"
      | "code"
    >
  : V extends "_local"
  ? Pick<
      RcgFaq,
      | "id"
      | "order"
      | "titleLang1"
      | "titleLang2"
      | "titleLang3"
      | "titleLang4"
      | "titleLang5"
      | "contentLang1"
      | "contentLang2"
      | "contentLang3"
      | "contentLang4"
      | "contentLang5"
      | "code"
    >
  : V extends "_minimal"
  ? Pick<RcgFaq, "id" | "title">
  : never;
