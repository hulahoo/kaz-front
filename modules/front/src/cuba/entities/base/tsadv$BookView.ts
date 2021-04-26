import { StandardEntity } from "./sys$StandardEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { Book } from "./tsadv$Book";
export class BookView extends StandardEntity {
  static NAME = "tsadv$BookView";
  personGroup?: PersonGroupExt | null;
  book?: Book | null;
}
export type BookViewViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "bookView.personGroup.book";
export type BookViewView<
  V extends BookViewViewName
> = V extends "bookView.personGroup.book"
  ? Pick<BookView, "id" | "personGroup" | "book">
  : never;
