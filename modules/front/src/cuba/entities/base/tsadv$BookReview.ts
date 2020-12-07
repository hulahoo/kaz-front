import { StandardEntity } from "./sys$StandardEntity";
import { Book } from "./tsadv$Book";
import { PersonExt } from "./base$PersonExt";
export class BookReview extends StandardEntity {
  static NAME = "tsadv$BookReview";
  book?: Book | null;
  author?: PersonExt | null;
  postDate?: any | null;
  reviewText?: string | null;
  rating?: any | null;
}
export type BookReviewViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "bookReview-browse-view"
  | "bookReview-edit-view";
export type BookReviewView<V extends BookReviewViewName> = V extends "_minimal"
  ? Pick<BookReview, "id" | "book" | "author" | "postDate">
  : V extends "_local"
  ? Pick<BookReview, "id" | "postDate" | "reviewText" | "rating">
  : V extends "_base"
  ? Pick<
      BookReview,
      "id" | "book" | "author" | "postDate" | "reviewText" | "rating"
    >
  : V extends "bookReview-browse-view"
  ? Pick<
      BookReview,
      "id" | "postDate" | "reviewText" | "rating" | "book" | "author"
    >
  : V extends "bookReview-edit-view"
  ? Pick<
      BookReview,
      "id" | "postDate" | "reviewText" | "rating" | "book" | "author"
    >
  : never;
