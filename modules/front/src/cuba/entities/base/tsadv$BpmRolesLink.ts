import { StandardEntity } from "./sys$StandardEntity";
import { BpmRolesDefiner } from "./tsadv$BpmRolesDefiner";
import { DicHrRole } from "./tsadv$DicHrRole";
export class BpmRolesLink extends StandardEntity {
  static NAME = "tsadv$BpmRolesLink";
  bpmRolesDefiner?: BpmRolesDefiner | null;
  hrRole?: DicHrRole | null;
  bprocUserTaskCode?: string | null;
  order?: number | null;
  required?: boolean | null;
  isAddableApprover?: boolean | null;
  priority?: number | null;
  findByCounter?: boolean | null;
}
export type BpmRolesLinkViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "bpmRolesLink-view";
export type BpmRolesLinkView<V extends BpmRolesLinkViewName> = V extends "_base"
  ? Pick<
      BpmRolesLink,
      | "id"
      | "bprocUserTaskCode"
      | "order"
      | "required"
      | "isAddableApprover"
      | "findByCounter"
    >
  : V extends "_local"
  ? Pick<
      BpmRolesLink,
      | "id"
      | "bprocUserTaskCode"
      | "order"
      | "required"
      | "isAddableApprover"
      | "findByCounter"
    >
  : V extends "bpmRolesLink-view"
  ? Pick<
      BpmRolesLink,
      | "id"
      | "bprocUserTaskCode"
      | "order"
      | "required"
      | "isAddableApprover"
      | "findByCounter"
      | "hrRole"
      | "bpmRolesDefiner"
    >
  : never;
