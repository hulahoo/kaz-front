import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class PersonAddressInt extends BaseUuidEntity {
  static NAME = "tsadv$PersonAddressInt";
  city?: any | null;
  addressType?: any | null;
  address?: string | null;
  country?: any | null;
  postalCode?: string | null;
  cityName?: string | null;
  startDate?: any | null;
  endDate?: any | null;
}
export type PersonAddressIntViewName = "_minimal" | "_local" | "_base";
export type PersonAddressIntView<
  V extends PersonAddressIntViewName
> = V extends "_minimal"
  ? Pick<PersonAddressInt, "id">
  : V extends "_base"
  ? Pick<PersonAddressInt, "id">
  : never;
