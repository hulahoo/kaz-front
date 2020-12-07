import { StandardEntity } from "./sys$StandardEntity";
import { BpmRolesDefiner } from "./tsadv$BpmRolesDefiner";
import { ProcRole } from "./bpm$ProcRole";
import { DicHrRole } from "./tsadv$DicHrRole";
import { PositionBpmRole } from "./tsadv$PositionBpmRole";
export class BpmRolesLink extends StandardEntity {
  static NAME = "tsadv$BpmRolesLink";
  bpmRolesDefiner?: BpmRolesDefiner | null;
  bpmRole?: ProcRole | null;
  hrRole?: DicHrRole | null;
  required?: boolean | null;
  findByCounter?: boolean | null;
  positionBpmRole?: PositionBpmRole | null;
}
export type BpmRolesLinkViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "bpmRolesLink-view";
export type BpmRolesLinkView<
  V extends BpmRolesLinkViewName
> = V extends "_local"
  ? Pick<BpmRolesLink, "id" | "required" | "findByCounter">
  : V extends "_base"
  ? Pick<BpmRolesLink, "id" | "required" | "findByCounter">
  : V extends "bpmRolesLink-view"
  ? Pick<
      BpmRolesLink,
      | "id"
      | "required"
      | "findByCounter"
      | "bpmRole"
      | "hrRole"
      | "bpmRolesDefiner"
      | "positionBpmRole"
    >
  : never;
