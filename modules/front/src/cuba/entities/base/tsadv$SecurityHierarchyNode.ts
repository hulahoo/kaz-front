import { StandardEntity } from "./sys$StandardEntity";
import { Group } from "./sec$Group";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
export class SecurityHierarchyNode extends StandardEntity {
  static NAME = "tsadv$SecurityHierarchyNode";
  securityGroup?: Group | null;
  organizationGroup?: OrganizationGroupExt | null;
}
export type SecurityHierarchyNodeViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "securityHierarchyNode-browse"
  | "securityHierarchyNode-edit";
export type SecurityHierarchyNodeView<
  V extends SecurityHierarchyNodeViewName
> = V extends "securityHierarchyNode-browse"
  ? Pick<SecurityHierarchyNode, "id" | "securityGroup" | "organizationGroup">
  : V extends "securityHierarchyNode-edit"
  ? Pick<SecurityHierarchyNode, "id" | "securityGroup" | "organizationGroup">
  : never;
