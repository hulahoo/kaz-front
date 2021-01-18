import { AbstractParentEntity } from "./AbstractParentEntity";
import { Attestation } from "./tsadv$Attestation";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
export class AttestationOrganization extends AbstractParentEntity {
  static NAME = "tsadv$AttestationOrganization";
  attestation?: Attestation | null;
  organizationGroup?: OrganizationGroupExt | null;
  includeChild?: boolean | null;
}
export type AttestationOrganizationViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "attestationOrganization-view";
export type AttestationOrganizationView<
  V extends AttestationOrganizationViewName
> = V extends "_base"
  ? Pick<
      AttestationOrganization,
      | "id"
      | "includeChild"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      AttestationOrganization,
      | "id"
      | "includeChild"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "attestationOrganization-view"
  ? Pick<
      AttestationOrganization,
      | "id"
      | "includeChild"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "organizationGroup"
      | "attestation"
    >
  : never;
