import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { LearningExpense } from "./tsadv$LearningExpense";
export class PersonLearningContract extends AbstractParentEntity {
  static NAME = "tsadv$PersonLearningContract";
  personGroup?: PersonGroupExt | null;
  learningExpense?: LearningExpense[] | null;
  contractNumber?: string | null;
  contractDate?: any | null;
  termOfService?: any | null;
  other?: string | null;
}
export type PersonLearningContractViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "personLearningContract.edit"
  | "personLearningContract-for-learninexpense";
export type PersonLearningContractView<
  V extends PersonLearningContractViewName
> = V extends "_local"
  ? Pick<
      PersonLearningContract,
      | "id"
      | "contractNumber"
      | "contractDate"
      | "termOfService"
      | "other"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      PersonLearningContract,
      | "id"
      | "contractNumber"
      | "contractDate"
      | "termOfService"
      | "other"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "personLearningContract.edit"
  ? Pick<
      PersonLearningContract,
      | "id"
      | "contractNumber"
      | "contractDate"
      | "termOfService"
      | "other"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "personGroup"
    >
  : V extends "personLearningContract-for-learninexpense"
  ? Pick<
      PersonLearningContract,
      "id" | "personGroup" | "contractNumber" | "contractDate" | "termOfService"
    >
  : never;
