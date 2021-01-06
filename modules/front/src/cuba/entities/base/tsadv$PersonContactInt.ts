import { AbstractEntityInt } from "./tsadv$AbstractEntityInt";
export class PersonContactInt extends AbstractEntityInt {
  static NAME = "tsadv$PersonContactInt";
  contactType?: any | null;
  contactTypeName?: string | null;
  contactValue?: string | null;
}
export type PersonContactIntViewName = "_base" | "_local" | "_minimal";
export type PersonContactIntView<
  V extends PersonContactIntViewName
> = V extends "_base"
  ? Pick<PersonContactInt, "id">
  : V extends "_minimal"
  ? Pick<PersonContactInt, "id">
  : never;
