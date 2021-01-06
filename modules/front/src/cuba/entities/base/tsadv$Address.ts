import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicAddressType } from "./tsadv$DicAddressType";
import { DicCountry } from "./base$DicCountry";
export class Address extends AbstractParentEntity {
  static NAME = "tsadv$Address";
  personGroup?: PersonGroupExt | null;
  addressType?: DicAddressType | null;
  address?: string | null;
  country?: DicCountry | null;
  postalCode?: string | null;
  city?: string | null;
  startDate?: any | null;
  endDate?: any | null;
}
export type AddressViewName = "_base" | "_local" | "_minimal" | "address.view";
export type AddressView<V extends AddressViewName> = V extends "_base"
  ? Pick<
      Address,
      | "id"
      | "address"
      | "postalCode"
      | "city"
      | "startDate"
      | "endDate"
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
      | "city"
      | "startDate"
      | "endDate"
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
      | "city"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "personGroup"
      | "addressType"
      | "country"
    >
  : never;
