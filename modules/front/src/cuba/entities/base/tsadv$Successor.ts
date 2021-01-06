import { AbstractParentEntity } from "./AbstractParentEntity";
import { SuccessionPlanning } from "./tsadv$SuccessionPlanning";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicReadinessLevel } from "./tsadv$DicReadinessLevel";
export class Successor extends AbstractParentEntity {
  static NAME = "tsadv$Successor";
  succession?: SuccessionPlanning | null;
  personGroup?: PersonGroupExt | null;
  startDate?: any | null;
  endDate?: any | null;
  readinessLevel?: DicReadinessLevel | null;
  note?: string | null;
}
export type SuccessorViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "successor-view"
  | "successor-viewPersonCard"
  | "successor.browse";
export type SuccessorView<V extends SuccessorViewName> = V extends "_base"
  ? Pick<
      Successor,
      | "id"
      | "succession"
      | "personGroup"
      | "startDate"
      | "endDate"
      | "note"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Successor,
      | "id"
      | "startDate"
      | "endDate"
      | "note"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<Successor, "id" | "succession" | "personGroup">
  : V extends "successor-view"
  ? Pick<
      Successor,
      | "id"
      | "startDate"
      | "endDate"
      | "note"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "succession"
      | "personGroup"
      | "readinessLevel"
      | "succession"
    >
  : V extends "successor-viewPersonCard"
  ? Pick<
      Successor,
      | "id"
      | "startDate"
      | "endDate"
      | "note"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "succession"
      | "readinessLevel"
    >
  : V extends "successor.browse"
  ? Pick<
      Successor,
      | "id"
      | "startDate"
      | "endDate"
      | "note"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "succession"
      | "personGroup"
      | "readinessLevel"
    >
  : never;
