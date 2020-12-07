import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class PersonReview extends AbstractParentEntity {
  static NAME = "tsadv$PersonReview";
  author?: PersonGroupExt | null;
  text?: string | null;
  dateTime?: any | null;
  liking?: string | null;
  person?: PersonGroupExt | null;
}
export type PersonReviewViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "personReview.browse";
export type PersonReviewView<
  V extends PersonReviewViewName
> = V extends "_local"
  ? Pick<
      PersonReview,
      | "id"
      | "text"
      | "dateTime"
      | "liking"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      PersonReview,
      | "id"
      | "text"
      | "dateTime"
      | "liking"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "personReview.browse"
  ? Pick<
      PersonReview,
      | "id"
      | "text"
      | "dateTime"
      | "liking"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "author"
      | "person"
    >
  : never;
