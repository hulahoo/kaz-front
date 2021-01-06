import { AbstractCisAddress } from "./AbstractCisAddress";
import { Party } from "./base$Party";
export class Address extends AbstractCisAddress {
  static NAME = "base$Address";
  streetAddressLang1?: string | null;
  streetAddressLang2?: string | null;
  streetAddressLang3?: string | null;
  streetAddressLang4?: string | null;
  streetAddressLang5?: string | null;
  legacyAddress?: string | null;
  latitude?: any | null;
  longitude?: any | null;
  parties?: Party[] | null;
  streetAddress?: string | null;
  additionalInformation?: string | null;
  fullAddress?: string | null;
}
export type AddressViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "address.browse"
  | "address.edit"
  | "address.test";
export type AddressView<V extends AddressViewName> = V extends "_base"
  ? Pick<
      Address,
      | "id"
      | "fullAddress"
      | "streetAddressLang1"
      | "streetAddressLang2"
      | "streetAddressLang3"
      | "streetAddressLang4"
      | "streetAddressLang5"
      | "legacyAddress"
      | "latitude"
      | "longitude"
      | "streetAddress"
      | "additionalInformation"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "street"
      | "house"
      | "apartment"
      | "additionalInformationLang1"
      | "additionalInformationLang2"
      | "additionalInformationLang3"
      | "additionalInformationLang4"
      | "additionalInformationLang5"
    >
  : V extends "_local"
  ? Pick<
      Address,
      | "id"
      | "streetAddressLang1"
      | "streetAddressLang2"
      | "streetAddressLang3"
      | "streetAddressLang4"
      | "streetAddressLang5"
      | "legacyAddress"
      | "latitude"
      | "longitude"
      | "streetAddress"
      | "additionalInformation"
      | "fullAddress"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "street"
      | "house"
      | "apartment"
      | "additionalInformationLang1"
      | "additionalInformationLang2"
      | "additionalInformationLang3"
      | "additionalInformationLang4"
      | "additionalInformationLang5"
    >
  : V extends "_minimal"
  ? Pick<Address, "id" | "fullAddress">
  : V extends "address.browse"
  ? Pick<
      Address,
      | "id"
      | "streetAddressLang1"
      | "streetAddressLang2"
      | "streetAddressLang3"
      | "streetAddressLang4"
      | "streetAddressLang5"
      | "legacyAddress"
      | "latitude"
      | "longitude"
      | "streetAddress"
      | "additionalInformation"
      | "fullAddress"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "street"
      | "house"
      | "apartment"
      | "additionalInformationLang1"
      | "additionalInformationLang2"
      | "additionalInformationLang3"
      | "additionalInformationLang4"
      | "additionalInformationLang5"
      | "country"
      | "city"
      | "cityDistrict"
      | "region"
      | "streetAddress"
      | "additionalInformation"
    >
  : V extends "address.edit"
  ? Pick<
      Address,
      | "id"
      | "streetAddressLang1"
      | "streetAddressLang2"
      | "streetAddressLang3"
      | "streetAddressLang4"
      | "streetAddressLang5"
      | "legacyAddress"
      | "latitude"
      | "longitude"
      | "streetAddress"
      | "additionalInformation"
      | "fullAddress"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "street"
      | "house"
      | "apartment"
      | "additionalInformationLang1"
      | "additionalInformationLang2"
      | "additionalInformationLang3"
      | "additionalInformationLang4"
      | "additionalInformationLang5"
      | "country"
      | "city"
      | "cityDistrict"
      | "region"
      | "streetAddress"
      | "additionalInformation"
    >
  : V extends "address.test"
  ? Pick<Address, "id" | "fullAddress">
  : never;
