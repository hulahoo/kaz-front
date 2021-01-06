import { StandardEntity } from "./sys$StandardEntity";
import { BpmRolesLink } from "./tsadv$BpmRolesLink";
export class BpmRolesDefiner extends StandardEntity {
  static NAME = "tsadv$BpmRolesDefiner";
  links?: BpmRolesLink[] | null;
}
export type BpmRolesDefinerViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "bpmRolesDefiner-view";
export type BpmRolesDefinerView<
  V extends BpmRolesDefinerViewName
> = V extends "bpmRolesDefiner-view"
  ? Pick<BpmRolesDefiner, "id" | "links">
  : never;
