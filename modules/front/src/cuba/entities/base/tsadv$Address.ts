import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicAddressType } from "./tsadv$DicAddressType";
import { DicCountry } from "./base$DicCountry";
import { DicCity } from "./base$DicCity";
import { DicLanguage } from "./base$DicLanguage";
import { FileDescriptor } from "./sys$FileDescriptor";
import { DicKato } from "./tsadv_DicKato";
import { DicStreetType } from "./tsadv_DicStreetType";
export class Address extends AbstractParentEntity {
  static NAME = "tsadv$Address";
  personGroup?: PersonGroupExt | null;
  addressType?: DicAddressType | null;
  address?: string | null;
  country?: DicCountry | null;
  postalCode?: string | null;
  cityName?: string | null;
  factAddress?: string | null;
  registrationAddress?: string | null;
  factAddressKATOCode?: string | null;
  registrationAddressKATOCode?: string | null;
  city?: DicCity | null;
  language?: DicLanguage | null;
  startDate?: any | null;
  endDate?: any | null;
  attachments?: FileDescriptor[] | null;
  kato?: DicKato | null;
  streetType?: DicStreetType | null;
  streetName?: string | null;
  building?: string | null;
  block?: string | null;
  flat?: string | null;
  addressForExpats?: string | null;
  notes?: string | null;
  addressKazakh?: string | null;
  addressEnglish?: string | null;
}
export type AddressViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "address.view"
  | "portal.my-profile";
export type AddressView<V extends AddressViewName> = V extends "_base"
  ? Pick<
      Address,
      | "id"
      | "address"
      | "postalCode"
      | "cityName"
      | "factAddress"
      | "registrationAddress"
      | "factAddressKATOCode"
      | "registrationAddressKATOCode"
      | "startDate"
      | "endDate"
      | "streetName"
      | "building"
      | "block"
      | "flat"
      | "addressForExpats"
      | "notes"
      | "addressKazakh"
      | "addressEnglish"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Address,
      | "id"
      | "address"
      | "postalCode"
      | "cityName"
      | "factAddress"
      | "registrationAddress"
      | "factAddressKATOCode"
      | "registrationAddressKATOCode"
      | "startDate"
      | "endDate"
      | "streetName"
      | "building"
      | "block"
      | "flat"
      | "addressForExpats"
      | "notes"
      | "addressKazakh"
      | "addressEnglish"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<Address, "id" | "address">
  : V extends "address.view"
  ? Pick<
      Address,
      | "id"
      | "address"
      | "postalCode"
      | "cityName"
      | "factAddress"
      | "registrationAddress"
      | "factAddressKATOCode"
      | "registrationAddressKATOCode"
      | "startDate"
      | "endDate"
      | "streetName"
      | "building"
      | "block"
      | "flat"
      | "addressForExpats"
      | "notes"
      | "addressKazakh"
      | "addressEnglish"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "personGroup"
      | "addressType"
      | "country"
      | "city"
      | "kato"
      | "streetType"
    >
  : V extends "portal.my-profile"
  ? Pick<
      Address,
      | "id"
      | "address"
      | "postalCode"
      | "cityName"
      | "factAddress"
      | "registrationAddress"
      | "factAddressKATOCode"
      | "registrationAddressKATOCode"
      | "startDate"
      | "endDate"
      | "streetName"
      | "building"
      | "block"
      | "flat"
      | "addressForExpats"
      | "notes"
      | "addressKazakh"
      | "addressEnglish"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "addressType"
      | "country"
      | "attachments"
      | "personGroup"
      | "kato"
      | "streetType"
    >
  : never;
