import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class PersonPojo extends BaseUuidEntity {
  static NAME = "tsadv$PersonPojo";
  personGroupId?: string | null;
  personId?: string | null;
  image?: string | null;
  name?: string | null;
  employeeNumber?: string | null;
}
export type PersonPojoViewName = "_minimal" | "_local" | "_base";
export type PersonPojoView<V extends PersonPojoViewName> = V extends "_minimal"
  ? Pick<PersonPojo, "id" | "name">
  : V extends "_base"
  ? Pick<PersonPojo, "id" | "name">
  : never;
