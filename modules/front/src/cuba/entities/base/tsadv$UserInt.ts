import { AbstractEntityInt } from "./tsadv$AbstractEntityInt";
import { PersonInt } from "./tsadv$PersonInt";
export class UserInt extends AbstractEntityInt {
  static NAME = "tsadv$UserInt";
  login?: string | null;
  language?: string | null;
  password?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  person?: PersonInt | null;
}
export type UserIntViewName = "_minimal" | "_local" | "_base";
export type UserIntView<V extends UserIntViewName> = V extends "_minimal"
  ? Pick<UserInt, "id">
  : V extends "_base"
  ? Pick<UserInt, "id">
  : never;
