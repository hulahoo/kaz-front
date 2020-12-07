import { StandardEntity } from "./sys$StandardEntity";
import { ProcModel } from "./bpm$ProcModel";
import { BpmRolesLink } from "./tsadv$BpmRolesLink";
export class BpmRolesDefiner extends StandardEntity {
  static NAME = "tsadv$BpmRolesDefiner";
  procModel?: ProcModel | null;
  links?: BpmRolesLink[] | null;
}
export type BpmRolesDefinerViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "bpmRolesDefiner-view";
export type BpmRolesDefinerView<
  V extends BpmRolesDefinerViewName
> = V extends "bpmRolesDefiner-view"
  ? Pick<BpmRolesDefiner, "id" | "procModel" | "links">
  : never;
