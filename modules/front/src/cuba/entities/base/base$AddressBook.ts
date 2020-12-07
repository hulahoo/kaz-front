import { AbstractParentEntity } from "./AbstractParentEntity";
import { UserExt } from "./base$UserExt";
import { ContactInfo } from "./base$ContactInfo";
export class AddressBook extends AbstractParentEntity {
  static NAME = "base$AddressBook";
  addressType?: any | null;
  recipientType?: any | null;
  address?: string | null;
  description?: string | null;
  fullAddress?: string | null;
  user?: UserExt | null;
  partyContactInfo?: ContactInfo | null;
}
export type AddressBookViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "addressBook.getParty";
export type AddressBookView<
  V extends AddressBookViewName
> = V extends "_minimal"
  ? Pick<AddressBook, "id" | "fullAddress">
  : V extends "_local"
  ? Pick<
      AddressBook,
      | "id"
      | "addressType"
      | "recipientType"
      | "address"
      | "description"
      | "fullAddress"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      AddressBook,
      | "id"
      | "fullAddress"
      | "addressType"
      | "recipientType"
      | "address"
      | "description"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "addressBook.getParty"
  ? Pick<
      AddressBook,
      | "id"
      | "addressType"
      | "recipientType"
      | "address"
      | "description"
      | "fullAddress"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "partyContactInfo"
    >
  : never;
