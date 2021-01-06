import { StandardEntity } from "./sys$StandardEntity";
import { Attestation } from "./tsadv$Attestation";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicAttestationResult } from "./tsadv$DicAttestationResult";
import { DicAttestationEvent } from "./tsadv$DicAttestationEvent";
import { DicAttestationInterviewResult } from "./tsadv$DicAttestationInterviewResult";
import { FileDescriptor } from "./sys$FileDescriptor";
export class AttestationParticipant extends StandardEntity {
  static NAME = "tsadv$AttestationParticipant";
  attestation?: Attestation | null;
  personGroup?: PersonGroupExt | null;
  attestationDate?: any | null;
  passingLanguage?: any | null;
  result?: DicAttestationResult | null;
  event?: DicAttestationEvent | null;
  interviewResult?: DicAttestationInterviewResult | null;
  commissionRecomendation?: string | null;
  notAppeared?: boolean | null;
  notAppearedReason?: string | null;
  protocol?: string | null;
  attachment?: FileDescriptor | null;
}
export type AttestationParticipantViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "attestationParticipant.attestation"
  | "attestationParticipant.edit"
  | "attestationParticipant.employees";
export type AttestationParticipantView<
  V extends AttestationParticipantViewName
> = V extends "_base"
  ? Pick<
      AttestationParticipant,
      | "id"
      | "attestation"
      | "attestationDate"
      | "passingLanguage"
      | "commissionRecomendation"
      | "notAppeared"
      | "notAppearedReason"
      | "protocol"
    >
  : V extends "_local"
  ? Pick<
      AttestationParticipant,
      | "id"
      | "attestationDate"
      | "passingLanguage"
      | "commissionRecomendation"
      | "notAppeared"
      | "notAppearedReason"
      | "protocol"
    >
  : V extends "_minimal"
  ? Pick<AttestationParticipant, "id" | "attestation">
  : V extends "attestationParticipant.attestation"
  ? Pick<
      AttestationParticipant,
      | "id"
      | "attestationDate"
      | "passingLanguage"
      | "commissionRecomendation"
      | "notAppeared"
      | "notAppearedReason"
      | "protocol"
      | "attestation"
      | "attachment"
    >
  : V extends "attestationParticipant.edit"
  ? Pick<
      AttestationParticipant,
      | "id"
      | "attestationDate"
      | "passingLanguage"
      | "commissionRecomendation"
      | "notAppeared"
      | "notAppearedReason"
      | "protocol"
      | "attestation"
      | "personGroup"
      | "result"
      | "event"
      | "interviewResult"
      | "attachment"
    >
  : V extends "attestationParticipant.employees"
  ? Pick<
      AttestationParticipant,
      | "id"
      | "attestationDate"
      | "passingLanguage"
      | "commissionRecomendation"
      | "notAppeared"
      | "notAppearedReason"
      | "protocol"
      | "personGroup"
      | "result"
      | "event"
      | "interviewResult"
      | "attachment"
    >
  : never;
