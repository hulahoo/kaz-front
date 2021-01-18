import { StandardEntity } from "./sys$StandardEntity";
import { PositionGroupExt } from "./base$PositionGroupExt";
import { BpmRolesLink } from "./tsadv$BpmRolesLink";
export class PositionBpmRole extends StandardEntity {
  static NAME = "tsadv$PositionBpmRole";
  positionGroup?: PositionGroupExt | null;
  bpmRolesLink?: BpmRolesLink[] | null;
}
export type PositionBpmRoleViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "positionBpmRole-view";
export type PositionBpmRoleView<
  V extends PositionBpmRoleViewName
> = V extends "positionBpmRole-view"
  ? Pick<PositionBpmRole, "id" | "bpmRolesLink" | "positionGroup">
  : never;
