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
  | "_minimal"
  | "_local"
  | "_base"
  | "successor.browse"
  | "successor-view"
  | "successor-viewPersonCard";
export type SuccessorView<V extends SuccessorViewName> = V extends "_minimal"
  ? Pick<Successor, "id" | "succession" | "personGroup">
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
  : V extends "_base"
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
  : never;
