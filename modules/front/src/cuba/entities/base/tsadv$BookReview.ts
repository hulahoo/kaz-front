import { StandardEntity } from "./sys$StandardEntity";
import { Book } from "./tsadv$Book";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class BookReview extends StandardEntity {
  static NAME = "tsadv$BookReview";
  book?: Book | null;
  author?: PersonGroupExt | null;
  postDate?: any | null;
  reviewText?: string | null;
  rating?: any | null;
}
export type BookReviewViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "bookReview-browse-view"
  | "bookReview-edit-view"
  | "portal-book-info-reviews";
export type BookReviewView<V extends BookReviewViewName> = V extends "_base"
  ? Pick<
      BookReview,
      "id" | "book" | "author" | "postDate" | "reviewText" | "rating"
    >
  : V extends "_local"
  ? Pick<BookReview, "id" | "postDate" | "reviewText" | "rating">
  : V extends "_minimal"
  ? Pick<BookReview, "id" | "book" | "author" | "postDate">
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
  : V extends "portal-book-info-reviews"
  ? Pick<BookReview, "id" | "postDate" | "reviewText" | "rating" | "author">
  : never;
