import { StandardEntity } from "./sys$StandardEntity";
import { PersonAction } from "./tsadv$PersonAction";
import { DicActionLikeType } from "./tsadv$DicActionLikeType";
import { Person } from "./base$Person";
export class PersonActionLike extends StandardEntity {
  static NAME = "tsadv$PersonActionLike";
  action?: PersonAction | null;
  likeType?: DicActionLikeType | null;
  personGroup?: Person | null;
}
export type PersonActionLikeViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "personActionLike-view";
export type PersonActionLikeView<
  V extends PersonActionLikeViewName
> = V extends "personActionLike-view"
  ? Pick<PersonActionLike, "id" | "action" | "likeType" | "personGroup">
  : never;
