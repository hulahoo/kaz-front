import { StandardEntity } from "./sys$StandardEntity";
import { PersonAction } from "./tsadv$PersonAction";
import { FileDescriptor } from "./sys$FileDescriptor";
export class PersonActionObject extends StandardEntity {
  static NAME = "tsadv$PersonActionObject";
  action?: PersonAction | null;
  object?: FileDescriptor | null;
}
export type PersonActionObjectViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "personActionObject-view";
export type PersonActionObjectView<
  V extends PersonActionObjectViewName
> = V extends "personActionObject-view"
  ? Pick<PersonActionObject, "id" | "action" | "object">
  : never;
