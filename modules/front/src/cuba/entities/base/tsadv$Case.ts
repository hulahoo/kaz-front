import { AbstractParentEntity } from "./AbstractParentEntity";
import { CaseType } from "./tsadv$CaseType";
import { JobGroup } from "./tsadv$JobGroup";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { PositionGroupExt } from "./base$PositionGroupExt";
export class Case extends AbstractParentEntity {
  static NAME = "tsadv$Case";
  longName?: string | null;
  shortName?: string | null;
  language?: string | null;
  caseType?: CaseType | null;
  jobGroup?: JobGroup | null;
  organizationGroup?: OrganizationGroupExt | null;
  personGroup?: PersonGroupExt | null;
  positionGroup?: PositionGroupExt | null;
}
export type CaseViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "case.view"
  | "caseJobName";
export type CaseView<V extends CaseViewName> = V extends "_base"
  ? Pick<
      Case,
      | "id"
      | "caseType"
      | "language"
      | "longName"
      | "shortName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Case,
      | "id"
      | "longName"
      | "shortName"
      | "language"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<Case, "id" | "caseType" | "language" | "longName" | "shortName">
  : V extends "case.view"
  ? Pick<
      Case,
      | "id"
      | "longName"
      | "shortName"
      | "language"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "caseType"
    >
  : V extends "caseJobName"
  ? Pick<
      Case,
      | "id"
      | "longName"
      | "shortName"
      | "language"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "jobGroup"
    >
  : never;
