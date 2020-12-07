import { StandardEntity } from "./sys$StandardEntity";
import { Group } from "./sec$Group";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
export class SecurityOrganizationList extends StandardEntity {
  static NAME = "tsadv$SecurityOrganizationList";
  securityGroup?: Group | null;
  organizationGroup?: OrganizationGroupExt | null;
  transactionDate?: any | null;
}
export type SecurityOrganizationListViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "securityOrganizationList-view"
  | "securityOrganizationList-edit";
export type SecurityOrganizationListView<
  V extends SecurityOrganizationListViewName
> = V extends "_local"
  ? Pick<SecurityOrganizationList, "id" | "transactionDate">
  : V extends "_base"
  ? Pick<SecurityOrganizationList, "id" | "transactionDate">
  : V extends "securityOrganizationList-view"
  ? Pick<
      SecurityOrganizationList,
      "id" | "securityGroup" | "organizationGroup" | "transactionDate"
    >
  : V extends "securityOrganizationList-edit"
  ? Pick<
      SecurityOrganizationList,
      "id" | "securityGroup" | "organizationGroup" | "transactionDate"
    >
  : never;
