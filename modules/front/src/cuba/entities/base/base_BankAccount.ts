import { StandardEntity } from "./sys$StandardEntity";
import { Party } from "./base$Party";
import { Bank } from "./base$Bank";
export class BankAccount extends StandardEntity {
  static NAME = "base_BankAccount";
  party?: Party | null;
  bank?: Bank | null;
  number?: string | null;
}
export type BankAccountViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "bankAccount-browse"
  | "bankAccount-edit";
export type BankAccountView<V extends BankAccountViewName> = V extends "_local"
  ? Pick<BankAccount, "id" | "number">
  : V extends "_base"
  ? Pick<BankAccount, "id" | "number">
  : V extends "bankAccount-browse"
  ? Pick<BankAccount, "id" | "number" | "party" | "bank">
  : V extends "bankAccount-edit"
  ? Pick<BankAccount, "id" | "number" | "party" | "bank">
  : never;
