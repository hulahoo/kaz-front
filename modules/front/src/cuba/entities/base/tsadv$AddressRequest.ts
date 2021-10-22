import {AbstractBprocRequest} from "./AbstractBprocRequest";
import {DicAddressType} from "./tsadv$DicAddressType";
import {DicCountry} from "./base$DicCountry";
import {Address} from "./tsadv$Address";
import {PersonGroupExt} from "./base$PersonGroupExt";
import {FileDescriptor} from "./sys$FileDescriptor";
import {DicKato} from "./tsadv_DicKato";
import {DicStreetType} from "./tsadv_DicStreetType";

export class AddressRequest extends AbstractBprocRequest {
  static NAME = "tsadv$AddressRequest";
  addressType?: DicAddressType | null;
  address?: string | null;
  country?: DicCountry | null;
  postalCode?: string | null;
  city?: string | null;
  startDate?: any | null;
  endDate?: any | null;
  baseAddress?: Address | null;
  personGroup?: PersonGroupExt | null;
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

export type AddressRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "addressRequest-view"
  | "portal.my-profile";
export type AddressRequestView<V extends AddressRequestViewName> = V extends "_base"
  ? Pick<AddressRequest,
    | "id"
    | "address"
    | "postalCode"
    | "city"
    | "startDate"
    | "endDate"
    | "legacyId"
    | "organizationBin"
    | "integrationUserLogin"
    | "requestNumber"
    | "requestDate"
    | "comment"
    | "streetName"
    | "building"
    | "block"
    | "flat"
    | "addressForExpats"
    | "addressKazakh"
    | "addressEnglish"
    >
  : V extends "_local"
  ? Pick<
      AddressRequest,
      | "id"
      | "address"
      | "postalCode"
      | "city"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
      | "streetName"
      | "building"
      | "block"
      | "flat"
      | "addressForExpats"
      | "addressKazakh"
      | "addressEnglish">
    : V extends "_minimal"
      ? Pick<AddressRequest, "id" | "address">
      : V extends "addressRequest-view"
        ? Pick<AddressRequest,
          | "id"
          | "address"
          | "postalCode"
          | "city"
          | "startDate"
          | "endDate"
          | "legacyId"
          | "organizationBin"
          | "integrationUserLogin"
          | "requestNumber"
          | "requestDate"
          | "comment"
          | "addressType"
          | "country"
          | "attachments"
          | "status"
          | "baseAddress"
          | "personGroup"
          | "streetName"
          | "building"
          | "block"
          | "flat"
          | "addressForExpats"
          | "addressKazakh"
          | "addressEnglish">
        : V extends "portal.my-profile"
          ? Pick<AddressRequest,
            | "id"
            | "address"
            | "postalCode"
            | "city"
            | "startDate"
            | "endDate"
            | "legacyId"
            | "organizationBin"
            | "integrationUserLogin"
            | "requestNumber"
            | "requestDate"
            | "comment"
            | "addressType"
            | "country"
            | "attachments"
            | "status"
            | "personGroup"
            | "baseAddress"
            | "kato"
            | "streetType"
            | "streetName"
            | "building"
            | "block"
            | "flat"
            | "addressForExpats"
            | "addressKazakh"
            | "addressEnglish">
          : never;
