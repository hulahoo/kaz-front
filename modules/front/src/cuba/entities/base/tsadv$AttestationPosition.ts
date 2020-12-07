import { AbstractParentEntity } from "./AbstractParentEntity";
import { Attestation } from "./tsadv$Attestation";
import { PositionGroupExt } from "./base$PositionGroupExt";
export class AttestationPosition extends AbstractParentEntity {
  static NAME = "tsadv$AttestationPosition";
  attestation?: Attestation | null;
  positionGroup?: PositionGroupExt | null;
}
export type AttestationPositionViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "attestationPosition-view";
export type AttestationPositionView<
  V extends AttestationPositionViewName
> = V extends "_local"
  ? Pick<
      AttestationPosition,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      AttestationPosition,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "attestationPosition-view"
  ? Pick<
      AttestationPosition,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "attestation"
      | "positionGroup"
    >
  : never;
