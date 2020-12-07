import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class OrganizationPojo extends BaseUuidEntity {
  static NAME = "tsadv$OrganizationPojo";
  groupId?: string | null;
  name?: string | null;
}
export type OrganizationPojoViewName = "_minimal" | "_local" | "_base";
export type OrganizationPojoView<V extends OrganizationPojoViewName> = never;
