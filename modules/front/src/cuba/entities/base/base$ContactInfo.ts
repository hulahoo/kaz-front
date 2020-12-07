import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicContactInfoType } from "./base$DicContactInfoType";
import { Party } from "./base$Party";
import { AddressBook } from "./base$AddressBook";
export class ContactInfo extends AbstractParentEntity {
  static NAME = "base$ContactInfo";
  type?: DicContactInfoType | null;
  value?: string | null;
  valueUnformatted?: string | null;
  active?: boolean | null;
  doNotDisturb?: boolean | null;
  silenceStartTime?: any | null;
  silenceEndTime?: any | null;
  party?: Party | null;
  addressBookEntry?: AddressBook | null;
}
export type ContactInfoViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "contactInfo.edit"
  | "contactInfo.view"
  | "contactInfo.searchPartyByEmail"
  | "contactInfo.editAndUpdateAddressBook"
  | "contactInfo.searchPartyByPhone";
export type ContactInfoView<
  V extends ContactInfoViewName
> = V extends "_minimal"
  ? Pick<ContactInfo, "id" | "type" | "value">
  : V extends "_local"
  ? Pick<
      ContactInfo,
      | "id"
      | "value"
      | "valueUnformatted"
      | "active"
      | "doNotDisturb"
      | "silenceStartTime"
      | "silenceEndTime"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      ContactInfo,
      | "id"
      | "type"
      | "value"
      | "valueUnformatted"
      | "active"
      | "doNotDisturb"
      | "silenceStartTime"
      | "silenceEndTime"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "contactInfo.edit"
  ? Pick<
      ContactInfo,
      | "id"
      | "value"
      | "valueUnformatted"
      | "active"
      | "doNotDisturb"
      | "silenceStartTime"
      | "silenceEndTime"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "type"
    >
  : V extends "contactInfo.view"
  ? Pick<
      ContactInfo,
      | "id"
      | "value"
      | "valueUnformatted"
      | "active"
      | "doNotDisturb"
      | "silenceStartTime"
      | "silenceEndTime"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "type"
    >
  : V extends "contactInfo.searchPartyByEmail"
  ? Pick<
      ContactInfo,
      "id" | "type" | "value" | "type" | "active" | "party" | "updatedBy"
    >
  : V extends "contactInfo.editAndUpdateAddressBook"
  ? Pick<
      ContactInfo,
      | "id"
      | "value"
      | "valueUnformatted"
      | "active"
      | "doNotDisturb"
      | "silenceStartTime"
      | "silenceEndTime"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "type"
      | "party"
      | "addressBookEntry"
    >
  : V extends "contactInfo.searchPartyByPhone"
  ? Pick<ContactInfo, "id" | "value" | "active" | "party" | "updateTs">
  : never;
