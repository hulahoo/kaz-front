import { AbstractParentEntity } from "./AbstractParentEntity";
import { Attestation } from "./tsadv$Attestation";
import { JobGroup } from "./tsadv$JobGroup";
export class AttestationJob extends AbstractParentEntity {
  static NAME = "tsadv$AttestationJob";
  attestation?: Attestation | null;
  jobGroup?: JobGroup | null;
}
export type AttestationJobViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "attestationJob-view";
export type AttestationJobView<
  V extends AttestationJobViewName
> = V extends "_base"
  ? Pick<
      AttestationJob,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      AttestationJob,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "attestationJob-view"
  ? Pick<
      AttestationJob,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "attestation"
      | "jobGroup"
    >
  : never;
