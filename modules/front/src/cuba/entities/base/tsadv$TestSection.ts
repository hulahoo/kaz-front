import { AbstractParentEntity } from "./AbstractParentEntity";
import { Test } from "./tsadv$Test";
import { QuestionBank } from "./tsadv$QuestionBank";
import { QuestionInSection } from "./tsadv$QuestionInSection";
export class TestSection extends AbstractParentEntity {
  static NAME = "tsadv$TestSection";
  test?: Test | null;
  dynamicLoad?: boolean | null;
  generateCount?: number | null;
  sectionName?: string | null;
  questionOrder?: any | null;
  questionBank?: QuestionBank | null;
  questionPerPage?: number | null;
  answerOrder?: any | null;
  questions?: QuestionInSection[] | null;
  pointsPerQuestion?: number | null;
}
export type TestSectionViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "testSection-for-test.browse"
  | "testSection.edit"
  | "testSection.with.questions";
export type TestSectionView<V extends TestSectionViewName> = V extends "_local"
  ? Pick<
      TestSection,
      | "id"
      | "dynamicLoad"
      | "generateCount"
      | "sectionName"
      | "questionOrder"
      | "questionPerPage"
      | "answerOrder"
      | "pointsPerQuestion"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      TestSection,
      | "id"
      | "dynamicLoad"
      | "generateCount"
      | "sectionName"
      | "questionOrder"
      | "questionPerPage"
      | "answerOrder"
      | "pointsPerQuestion"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "testSection-for-test.browse"
  ? Pick<
      TestSection,
      | "id"
      | "sectionName"
      | "questionOrder"
      | "questionBank"
      | "questionPerPage"
      | "answerOrder"
    >
  : V extends "testSection.edit"
  ? Pick<
      TestSection,
      | "id"
      | "sectionName"
      | "questionOrder"
      | "questionBank"
      | "questionPerPage"
      | "answerOrder"
      | "questions"
      | "dynamicLoad"
      | "generateCount"
      | "pointsPerQuestion"
    >
  : V extends "testSection.with.questions"
  ? Pick<
      TestSection,
      | "id"
      | "dynamicLoad"
      | "generateCount"
      | "sectionName"
      | "questionOrder"
      | "questionPerPage"
      | "answerOrder"
      | "pointsPerQuestion"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "questions"
    >
  : never;
