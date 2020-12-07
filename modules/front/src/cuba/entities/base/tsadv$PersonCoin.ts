import { StandardEntity } from "./sys$StandardEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class PersonCoin extends StandardEntity {
  static NAME = "tsadv$PersonCoin";
  personGroup?: PersonGroupExt | null;
  coins?: any | null;
}
export type PersonCoinViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "personCoin.edit";
export type PersonCoinView<V extends PersonCoinViewName> = V extends "_local"
  ? Pick<PersonCoin, "id" | "coins">
  : V extends "_base"
  ? Pick<PersonCoin, "id" | "coins">
  : V extends "personCoin.edit"
  ? Pick<PersonCoin, "id" | "coins" | "personGroup">
  : never;
