import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class PersonMedalPojo extends BaseUuidEntity {
  static NAME = "tsadv$PersonMedalPojo";
  medalName?: string | null;
  medalId?: string | null;
  medalImage?: string | null;
  count?: any | null;
  sort?: number | null;
}
export type PersonMedalPojoViewName = "_minimal" | "_local" | "_base";
export type PersonMedalPojoView<V extends PersonMedalPojoViewName> = never;
