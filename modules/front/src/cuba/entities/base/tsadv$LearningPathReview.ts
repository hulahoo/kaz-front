import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { LearningPath } from "./tsadv$LearningPath";
export class LearningPathReview extends AbstractParentEntity {
  static NAME = "tsadv$LearningPathReview";
  personGroup?: PersonGroupExt | null;
  learningPath?: LearningPath | null;
  rate?: any | null;
  text?: string | null;
}
export type LearningPathReviewViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "learningPathReview.browse"
  | "learningPathReview.rate";
export type LearningPathReviewView<
  V extends LearningPathReviewViewName
> = V extends "_local"
  ? Pick<
      LearningPathReview,
      | "id"
      | "rate"
      | "text"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      LearningPathReview,
      | "id"
      | "rate"
      | "text"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "learningPathReview.browse"
  ? Pick<
      LearningPathReview,
      "id" | "personGroup" | "learningPath" | "rate" | "text"
    >
  : V extends "learningPathReview.rate"
  ? Pick<LearningPathReview, "id" | "learningPath" | "rate">
  : never;
