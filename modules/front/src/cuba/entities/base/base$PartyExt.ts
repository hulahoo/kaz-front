import { Party } from "./base$Party";
import { Course } from "./tsadv$Course";
import { PartyContactPerson } from "./tsadv$PartyContactPerson";
export class PartyExt extends Party {
  static NAME = "base$PartyExt";
  course?: Course[] | null;
  trainingProvider?: boolean | null;
  bin?: string | null;
  rnn?: string | null;
  signer?: string | null;
  job?: string | null;
  reason?: string | null;
  partyContactPerson?: PartyContactPerson[] | null;
}
export type PartyExtViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "partyExt.browse"
  | "partyExt.edit";
export type PartyExtView<V extends PartyExtViewName> = V extends "_minimal"
  ? Pick<PartyExt, "id" | "name">
  : V extends "_local"
  ? Pick<
      PartyExt,
      | "id"
      | "trainingProvider"
      | "bin"
      | "rnn"
      | "signer"
      | "job"
      | "reason"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "name"
      | "partyType"
      | "nationalIdentifier"
      | "active"
      | "resident"
      | "upperName"
    >
  : V extends "_base"
  ? Pick<
      PartyExt,
      | "id"
      | "name"
      | "trainingProvider"
      | "bin"
      | "rnn"
      | "signer"
      | "job"
      | "reason"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "partyType"
      | "nationalIdentifier"
      | "active"
      | "resident"
      | "upperName"
    >
  : V extends "partyExt.browse"
  ? Pick<
      PartyExt,
      | "id"
      | "trainingProvider"
      | "bin"
      | "rnn"
      | "signer"
      | "job"
      | "reason"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "name"
      | "partyType"
      | "nationalIdentifier"
      | "active"
      | "resident"
      | "upperName"
    >
  : V extends "partyExt.edit"
  ? Pick<
      PartyExt,
      | "id"
      | "trainingProvider"
      | "bin"
      | "rnn"
      | "signer"
      | "job"
      | "reason"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "name"
      | "partyType"
      | "nationalIdentifier"
      | "active"
      | "resident"
      | "upperName"
      | "course"
      | "contactInfo"
    >
  : never;
