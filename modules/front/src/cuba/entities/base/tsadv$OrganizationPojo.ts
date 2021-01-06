import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class OrganizationPojo extends BaseUuidEntity {
  static NAME = "tsadv$OrganizationPojo";
  groupId?: string | null;
  name?: string | null;
}
export type OrganizationPojoViewName = "_base" | "_local" | "_minimal";
export type OrganizationPojoView<V extends OrganizationPojoViewName> = never;
