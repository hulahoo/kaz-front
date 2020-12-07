import { StandardEntity } from "./sys$StandardEntity";
import { PositionGroupExt } from "./base$PositionGroupExt";
import { ProcModel } from "./bpm$ProcModel";
import { BpmRolesLink } from "./tsadv$BpmRolesLink";
export class PositionBpmRole extends StandardEntity {
  static NAME = "tsadv$PositionBpmRole";
  positionGroup?: PositionGroupExt | null;
  procModel?: ProcModel | null;
  bpmRolesLink?: BpmRolesLink[] | null;
}
export type PositionBpmRoleViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "positionBpmRole-view";
export type PositionBpmRoleView<
  V extends PositionBpmRoleViewName
> = V extends "positionBpmRole-view"
  ? Pick<PositionBpmRole, "id" | "procModel" | "bpmRolesLink" | "positionGroup">
  : never;
