import { StandardEntity } from "./sys$StandardEntity";
import { DicHrRole } from "./tsadv$DicHrRole";
import { UserExt } from "./tsadv$UserExt";
export class BprocInstanceRolesLink extends StandardEntity {
  static NAME = "tsadv_BprocInstanceRolesLink";
  processInstanceId?: string | null;
  hrRole?: DicHrRole | null;
  user?: UserExt | null;
  required?: boolean | null;
}
export type BprocInstanceRolesLinkViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "bprocInstanceRolesLink-getAssignee";
export type BprocInstanceRolesLinkView<
  V extends BprocInstanceRolesLinkViewName
> = V extends "_base"
  ? Pick<BprocInstanceRolesLink, "id" | "processInstanceId">
  : V extends "_local"
  ? Pick<BprocInstanceRolesLink, "id" | "processInstanceId">
  : V extends "bprocInstanceRolesLink-getAssignee"
  ? Pick<BprocInstanceRolesLink, "id" | "processInstanceId" | "hrRole" | "user">
  : never;
