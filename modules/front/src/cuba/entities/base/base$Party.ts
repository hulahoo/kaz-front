import { AbstractParty } from "./AbstractParty";
import { DicCountry } from "./base$DicCountry";
import { DicClientStatus } from "./base$DicClientStatus";
import { FileDescriptor } from "./sys$FileDescriptor";
import { Address } from "./base$Address";
import { ContactInfo } from "./base$ContactInfo";
import { BankAccount } from "./base_BankAccount";
export class Party extends AbstractParty {
  static NAME = "base$Party";
  name?: string | null;
  partyType?: any | null;
  nationalIdentifier?: string | null;
  active?: boolean | null;
  resident?: boolean | null;
  residenceCountry?: DicCountry | null;
  clientStatus?: DicClientStatus | null;
  image?: FileDescriptor | null;
  addresses?: Address[] | null;
  contactInfo?: ContactInfo[] | null;
  accounts?: BankAccount[] | null;
  upperName?: string | null;
}
export type PartyViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "party-base-browse"
  | "party-base-edit";
export type PartyView<V extends PartyViewName> = V extends "_base"
  ? Pick<
      Party,
      | "id"
      | "name"
      | "partyType"
      | "nationalIdentifier"
      | "active"
      | "resident"
      | "upperName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Party,
      | "id"
      | "name"
      | "partyType"
      | "nationalIdentifier"
      | "active"
      | "resident"
      | "upperName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<Party, "id" | "name">
  : V extends "party-base-browse"
  ? Pick<
      Party,
      | "id"
      | "name"
      | "partyType"
      | "nationalIdentifier"
      | "active"
      | "resident"
      | "upperName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "residenceCountry"
      | "clientStatus"
    >
  : V extends "party-base-edit"
  ? Pick<
      Party,
      | "id"
      | "name"
      | "partyType"
      | "nationalIdentifier"
      | "active"
      | "resident"
      | "upperName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "residenceCountry"
      | "clientStatus"
      | "image"
      | "addresses"
      | "contactInfo"
      | "accounts"
      | "responsible"
    >
  : never;
