import { AbstractParentEntity } from "./AbstractParentEntity";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { NotAllowedPerson } from "./tsadv$NotAllowedPerson";
import { PreAndPostShiftInspection } from "./tsadv$PreAndPostShiftInspection";
import { Attachment } from "./tsadv$Attachment";
import { HarmfulFactorsDetail } from "./tsadv$HarmfulFactorsDetail";
export class HarmfullFactors extends AbstractParentEntity {
  static NAME = "tsadv$HarmfullFactors";
  organization?: OrganizationGroupExt | null;
  notAllowedPerson?: NotAllowedPerson[] | null;
  preAndPost?: PreAndPostShiftInspection[] | null;
  attachment?: Attachment[] | null;
  details?: HarmfulFactorsDetail[] | null;
  entryDate?: any | null;
  laboratory?: string | null;
}
export type HarmfullFactorsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "harmfullFactors-view";
export type HarmfullFactorsView<
  V extends HarmfullFactorsViewName
> = V extends "_base"
  ? Pick<
      HarmfullFactors,
      | "id"
      | "entryDate"
      | "laboratory"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      HarmfullFactors,
      | "id"
      | "entryDate"
      | "laboratory"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "harmfullFactors-view"
  ? Pick<
      HarmfullFactors,
      | "id"
      | "organization"
      | "entryDate"
      | "laboratory"
      | "attachment"
      | "details"
      | "preAndPost"
      | "notAllowedPerson"
    >
  : never;
