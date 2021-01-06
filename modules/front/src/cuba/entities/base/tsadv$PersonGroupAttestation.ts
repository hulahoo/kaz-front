import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { Attestation } from "./tsadv$Attestation";
export class PersonGroupAttestation extends BaseUuidEntity {
  static NAME = "tsadv$PersonGroupAttestation";
  personGroupExt?: PersonGroupExt | null;
  attestation?: Attestation | null;
}
export type PersonGroupAttestationViewName = "_base" | "_local" | "_minimal";
export type PersonGroupAttestationView<
  V extends PersonGroupAttestationViewName
> = never;
