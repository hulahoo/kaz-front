import { StandardEntity } from "./sys$StandardEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class PersonPoint extends StandardEntity {
  static NAME = "tsadv$PersonPoint";
  personGroup?: PersonGroupExt | null;
  points?: any | null;
}
export type PersonPointViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "personPoint.edit";
export type PersonPointView<V extends PersonPointViewName> = V extends "_local"
  ? Pick<PersonPoint, "id" | "points">
  : V extends "_base"
  ? Pick<PersonPoint, "id" | "points">
  : V extends "personPoint.edit"
  ? Pick<PersonPoint, "id" | "points" | "personGroup">
  : never;
