import { StandardEntity } from "./sys$StandardEntity";
import { DicAddressType } from "./tsadv$DicAddressType";
import { DicCountry } from "./base$DicCountry";
import { FileDescriptor } from "./sys$FileDescriptor";
import { DicRequestStatus } from "./tsadv$DicRequestStatus";
import { Address } from "./tsadv$Address";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class AddressRequest extends StandardEntity {
  static NAME = "tsadv$AddressRequest";
  addressType?: DicAddressType | null;
  requestNumber?: any | null;
  address?: string | null;
  country?: DicCountry | null;
  postalCode?: string | null;
  city?: string | null;
  startDate?: any | null;
  endDate?: any | null;
  attachment?: FileDescriptor | null;
  status?: DicRequestStatus | null;
  baseAddress?: Address | null;
  personGroup?: PersonGroupExt | null;
}
export type AddressRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "addressRequest-view";
export type AddressRequestView<
  V extends AddressRequestViewName
> = V extends "_base"
  ? Pick<
      AddressRequest,
      | "id"
      | "requestNumber"
      | "address"
      | "postalCode"
      | "city"
      | "startDate"
      | "endDate"
    >
  : V extends "_local"
  ? Pick<
      AddressRequest,
      | "id"
      | "requestNumber"
      | "address"
      | "postalCode"
      | "city"
      | "startDate"
      | "endDate"
    >
  : V extends "addressRequest-view"
  ? Pick<
      AddressRequest,
      | "id"
      | "requestNumber"
      | "address"
      | "postalCode"
      | "city"
      | "startDate"
      | "endDate"
      | "addressType"
      | "country"
      | "attachment"
      | "status"
      | "baseAddress"
      | "personGroup"
    >
  : never;
