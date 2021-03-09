import { StandardEntity } from "./sys$StandardEntity";
import { DicBookCategory } from "./tsadv$DicBookCategory";
import { FileDescriptor } from "./sys$FileDescriptor";
import { BookReview } from "./tsadv$BookReview";
export class Book extends StandardEntity {
  static NAME = "tsadv$Book";
  bookNameLang1?: string | null;
  bookDescriptionLang1?: string | null;
  authorLang1?: string | null;
  publishDate?: any | null;
  isbn?: string | null;
  active?: boolean | null;
  averageScore?: any | null;
  category?: DicBookCategory | null;
  image?: FileDescriptor | null;
  language?: any | null;
  fb2?: FileDescriptor | null;
  epub?: FileDescriptor | null;
  mobi?: FileDescriptor | null;
  kf8?: FileDescriptor | null;
  pdf?: FileDescriptor | null;
  djvu?: FileDescriptor | null;
  reviews?: BookReview[] | null;
}
export type BookViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "book-browse-view"
  | "book-edit-view"
  | "book-library-view"
  | "book.with.books"
  | "portal-book-info";
export type BookView<V extends BookViewName> = V extends "_base"
  ? Pick<
      Book,
      | "id"
      | "bookNameLang1"
      | "bookDescriptionLang1"
      | "authorLang1"
      | "publishDate"
      | "isbn"
      | "active"
      | "averageScore"
      | "language"
    >
  : V extends "_local"
  ? Pick<
      Book,
      | "id"
      | "bookNameLang1"
      | "bookDescriptionLang1"
      | "authorLang1"
      | "publishDate"
      | "isbn"
      | "active"
      | "averageScore"
      | "language"
    >
  : V extends "_minimal"
  ? Pick<Book, "id" | "bookNameLang1">
  : V extends "book-browse-view"
  ? Pick<
      Book,
      | "id"
      | "bookNameLang1"
      | "bookDescriptionLang1"
      | "authorLang1"
      | "publishDate"
      | "isbn"
      | "active"
      | "averageScore"
      | "language"
      | "image"
      | "reviews"
      | "category"
    >
  : V extends "book-edit-view"
  ? Pick<
      Book,
      | "id"
      | "bookNameLang1"
      | "bookDescriptionLang1"
      | "authorLang1"
      | "publishDate"
      | "isbn"
      | "active"
      | "averageScore"
      | "language"
      | "image"
      | "fb2"
      | "epub"
      | "mobi"
      | "kf8"
      | "pdf"
      | "djvu"
      | "reviews"
      | "category"
    >
  : V extends "book-library-view"
  ? Pick<
      Book,
      | "id"
      | "bookNameLang1"
      | "bookDescriptionLang1"
      | "authorLang1"
      | "publishDate"
      | "isbn"
      | "active"
      | "averageScore"
      | "language"
      | "category"
      | "image"
      | "reviews"
    >
  : V extends "book.with.books"
  ? Pick<
      Book,
      | "id"
      | "bookNameLang1"
      | "image"
      | "pdf"
      | "djvu"
      | "epub"
      | "mobi"
      | "kf8"
    >
  : V extends "portal-book-info"
  ? Pick<
      Book,
      | "id"
      | "bookNameLang1"
      | "bookDescriptionLang1"
      | "authorLang1"
      | "publishDate"
      | "isbn"
      | "active"
      | "averageScore"
      | "language"
      | "djvu"
      | "epub"
      | "fb2"
      | "pdf"
      | "mobi"
      | "reviews"
    >
  : never;
