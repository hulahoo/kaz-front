import { StandardEntity } from "./sys$StandardEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { Medal } from "./tsadv$Medal";
export class PersonMedal extends StandardEntity {
  static NAME = "tsadv$PersonMedal";
  personGroup?: PersonGroupExt | null;
  medal?: Medal | null;
}
export type PersonMedalViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "personMedal.edit";
export type PersonMedalView<
  V extends PersonMedalViewName
> = V extends "personMedal.edit"
  ? Pick<PersonMedal, "id" | "personGroup" | "medal">
  : never;
