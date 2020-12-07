import { StandardEntity } from "./sys$StandardEntity";
import { DicPersonAwardType } from "./tsadv$DicPersonAwardType";
import { AwardProgram } from "./tsadv$AwardProgram";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class PersonAward extends StandardEntity {
  static NAME = "tsadv$PersonAward";
  type?: DicPersonAwardType | null;
  awardProgram?: AwardProgram | null;
  date?: any | null;
  author?: PersonGroupExt | null;
  receiver?: PersonGroupExt | null;
  history?: string | null;
  why?: string | null;
  status?: any | null;
}
export type PersonAwardViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "personAward.edit"
  | "personAward.find";
export type PersonAwardView<V extends PersonAwardViewName> = V extends "_local"
  ? Pick<PersonAward, "id" | "date" | "history" | "why" | "status">
  : V extends "_base"
  ? Pick<PersonAward, "id" | "date" | "history" | "why" | "status">
  : V extends "personAward.edit"
  ? Pick<
      PersonAward,
      | "id"
      | "date"
      | "history"
      | "why"
      | "status"
      | "type"
      | "author"
      | "receiver"
      | "awardProgram"
    >
  : V extends "personAward.find"
  ? Pick<PersonAward, "id" | "date" | "history" | "why" | "status">
  : never;
