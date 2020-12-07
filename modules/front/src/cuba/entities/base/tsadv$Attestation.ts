import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicAttestationType } from "./tsadv$DicAttestationType";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { PositionGroupExt } from "./base$PositionGroupExt";
import { JobGroup } from "./tsadv$JobGroup";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class Attestation extends AbstractParentEntity {
  static NAME = "tsadv$Attestation";
  attestationName?: string | null;
  attestationType?: DicAttestationType | null;
  startDate?: any | null;
  endDate?: any | null;
  organizationGroup?: OrganizationGroupExt | null;
  positionGroup?: PositionGroupExt | null;
  jobGroup?: JobGroup | null;
  reason?: string | null;
  documentNumber?: string | null;
  documentDate?: any | null;
  personGroupExt?: PersonGroupExt | null;
}
export type AttestationViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "attestation.browse"
  | "attestation.edit";
export type AttestationView<
  V extends AttestationViewName
> = V extends "_minimal"
  ? Pick<Attestation, "id" | "attestationName">
  : V extends "_local"
  ? Pick<
      Attestation,
      | "id"
      | "attestationName"
      | "startDate"
      | "endDate"
      | "reason"
      | "documentNumber"
      | "documentDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      Attestation,
      | "id"
      | "attestationName"
      | "startDate"
      | "endDate"
      | "reason"
      | "documentNumber"
      | "documentDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "attestation.browse"
  ? Pick<
      Attestation,
      | "id"
      | "attestationName"
      | "organizationGroup"
      | "startDate"
      | "endDate"
      | "positionGroup"
      | "jobGroup"
    >
  : V extends "attestation.edit"
  ? Pick<
      Attestation,
      | "id"
      | "attestationName"
      | "startDate"
      | "endDate"
      | "reason"
      | "documentNumber"
      | "documentDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "organizationGroup"
      | "attestationType"
      | "positionGroup"
      | "jobGroup"
    >
  : never;
