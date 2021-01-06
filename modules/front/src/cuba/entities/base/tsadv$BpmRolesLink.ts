import { StandardEntity } from "./sys$StandardEntity";
import { BpmRolesDefiner } from "./tsadv$BpmRolesDefiner";
import { DicHrRole } from "./tsadv$DicHrRole";
import { PositionBpmRole } from "./tsadv$PositionBpmRole";
export class BpmRolesLink extends StandardEntity {
  static NAME = "tsadv$BpmRolesLink";
  bpmRolesDefiner?: BpmRolesDefiner | null;
  hrRole?: DicHrRole | null;
  required?: boolean | null;
  findByCounter?: boolean | null;
  positionBpmRole?: PositionBpmRole | null;
}
export type BpmRolesLinkViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "bpmRolesLink-view";
export type BpmRolesLinkView<V extends BpmRolesLinkViewName> = V extends "_base"
  ? Pick<BpmRolesLink, "id" | "required" | "findByCounter">
  : V extends "_local"
  ? Pick<BpmRolesLink, "id" | "required" | "findByCounter">
  : V extends "bpmRolesLink-view"
  ? Pick<
      BpmRolesLink,
      | "id"
      | "required"
      | "findByCounter"
      | "hrRole"
      | "bpmRolesDefiner"
      | "positionBpmRole"
    >
  : never;
