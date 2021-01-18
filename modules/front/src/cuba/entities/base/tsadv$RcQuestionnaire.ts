import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicRcQuestionnaireStatus } from "./tsadv$DicRcQuestionnaireStatus";
import { DicRcQuestionnaireCategory } from "./tsadv$DicRcQuestionnaireCategory";
import { RcQuestionnaireQuestion } from "./tsadv$RcQuestionnaireQuestion";
export class RcQuestionnaire extends AbstractParentEntity {
  static NAME = "tsadv$RcQuestionnaire";
  name?: string | null;
  langName?: string | null;
  name2?: string | null;
  name3?: string | null;
  name4?: string | null;
  name5?: string | null;
  passingScore?: any | null;
  instruction?: string | null;
  status?: DicRcQuestionnaireStatus | null;
  category?: DicRcQuestionnaireCategory | null;
  questions?: RcQuestionnaireQuestion[] | null;
}
export type RcQuestionnaireViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "rcQuestionnaire.lookup"
  | "rcQuestionnaire.rest"
  | "rcQuestionnaire.view";
export type RcQuestionnaireView<
  V extends RcQuestionnaireViewName
> = V extends "_base"
  ? Pick<
      RcQuestionnaire,
      | "id"
      | "name"
      | "name2"
      | "name3"
      | "name4"
      | "name5"
      | "passingScore"
      | "instruction"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      RcQuestionnaire,
      | "id"
      | "name"
      | "name2"
      | "name3"
      | "name4"
      | "name5"
      | "passingScore"
      | "instruction"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<RcQuestionnaire, "id" | "name">
  : V extends "rcQuestionnaire.lookup"
  ? Pick<RcQuestionnaire, "id" | "name" | "status" | "category" | "instruction">
  : V extends "rcQuestionnaire.rest"
  ? Pick<
      RcQuestionnaire,
      | "id"
      | "name"
      | "name2"
      | "name3"
      | "name4"
      | "name5"
      | "passingScore"
      | "instruction"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "status"
      | "category"
      | "questions"
    >
  : V extends "rcQuestionnaire.view"
  ? Pick<
      RcQuestionnaire,
      | "id"
      | "name"
      | "name2"
      | "name3"
      | "name4"
      | "name5"
      | "passingScore"
      | "instruction"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "status"
      | "category"
      | "questions"
    >
  : never;
