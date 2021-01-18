import { AbstractParentEntity } from "./AbstractParentEntity";
import { TestSection } from "./tsadv$TestSection";
import { Question } from "./tsadv$Question";
export class QuestionInSection extends AbstractParentEntity {
  static NAME = "tsadv$QuestionInSection";
  testSection?: TestSection | null;
  question?: Question | null;
}
export type QuestionInSectionViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "questionInSection.browse";
export type QuestionInSectionView<
  V extends QuestionInSectionViewName
> = V extends "_base"
  ? Pick<
      QuestionInSection,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      QuestionInSection,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "questionInSection.browse"
  ? Pick<QuestionInSection, "id" | "question">
  : never;
