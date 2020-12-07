import { StandardEntity } from "./sys$StandardEntity";
import { PartyExt } from "./base$PartyExt";
import { DicContactPersonType } from "./tsadv$DicContactPersonType";
export class PartyContactPerson extends StandardEntity {
  static NAME = "tsadv$PartyContactPerson";
  partyExt?: PartyExt | null;
  fullName?: string | null;
  contactPersonType?: DicContactPersonType | null;
}
export type PartyContactPersonViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "partyContactPerson.browse"
  | "partyContactPerson.edit";
export type PartyContactPersonView<
  V extends PartyContactPersonViewName
> = V extends "_minimal"
  ? Pick<PartyContactPerson, "id" | "fullName">
  : V extends "_local"
  ? Pick<PartyContactPerson, "id" | "fullName">
  : V extends "_base"
  ? Pick<PartyContactPerson, "id" | "fullName">
  : V extends "partyContactPerson.browse"
  ? Pick<
      PartyContactPerson,
      "id" | "fullName" | "partyExt" | "contactPersonType"
    >
  : V extends "partyContactPerson.edit"
  ? Pick<
      PartyContactPerson,
      "id" | "fullName" | "partyExt" | "contactPersonType"
    >
  : never;
