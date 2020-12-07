import { StandardEntity } from "./sys$StandardEntity";
import { Group } from "./sec$Group";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
export class SecurityOrganizationEligibility extends StandardEntity {
  static NAME = "tsadv$SecurityOrganizationEligibility";
  securityGroup?: Group | null;
  organizationGroup?: OrganizationGroupExt | null;
  include?: boolean | null;
}
export type SecurityOrganizationEligibilityViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "securityOrganizationEligibility-view"
  | "securityOrganizationEligibility-edit";
export type SecurityOrganizationEligibilityView<
  V extends SecurityOrganizationEligibilityViewName
> = V extends "_local"
  ? Pick<SecurityOrganizationEligibility, "id" | "include">
  : V extends "_base"
  ? Pick<SecurityOrganizationEligibility, "id" | "include">
  : V extends "securityOrganizationEligibility-view"
  ? Pick<
      SecurityOrganizationEligibility,
      "id" | "securityGroup" | "organizationGroup" | "include"
    >
  : V extends "securityOrganizationEligibility-edit"
  ? Pick<
      SecurityOrganizationEligibility,
      "id" | "securityGroup" | "organizationGroup" | "include"
    >
  : never;
