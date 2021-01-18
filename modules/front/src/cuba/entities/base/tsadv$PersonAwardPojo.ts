import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class PersonAwardPojo extends BaseUuidEntity {
  static NAME = "tsadv$PersonAwardPojo";
  authorEmployeeNumber?: string | null;
  receiverEmployeeNumber?: string | null;
  history?: string | null;
  why?: string | null;
  status?: string | null;
}
export type PersonAwardPojoViewName = "_base" | "_local" | "_minimal";
export type PersonAwardPojoView<V extends PersonAwardPojoViewName> = never;
