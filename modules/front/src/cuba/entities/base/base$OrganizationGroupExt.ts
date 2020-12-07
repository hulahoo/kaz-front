import { OrganizationGroup } from "./base$OrganizationGroup";
import { OrganizationExt } from "./base$OrganizationExt";
import { PositionExt } from "./base$PositionExt";
import { CompetenceElement } from "./tsadv$CompetenceElement";
import { OrganizationHrUser } from "./tsadv$OrganizationHrUser";
import { Case } from "./tsadv$Case";
import { PerformancePlan } from "./tsadv$PerformancePlan";
import { OrganizationGroupGoalLink } from "./tsadv$OrganizationGroupGoalLink";
import { OrgAnalytics } from "./tsadv$OrgAnalytics";
export class OrganizationGroupExt extends OrganizationGroup {
  static NAME = "base$OrganizationGroupExt";
  list?: OrganizationExt[] | null;
  position?: PositionExt[] | null;
  organization?: OrganizationExt | null;
  competenceElements?: CompetenceElement[] | null;
  hrUsers?: OrganizationHrUser[] | null;
  cases?: Case[] | null;
  performancePlans?: PerformancePlan[] | null;
  goals?: OrganizationGroupGoalLink[] | null;
  analytics?: OrgAnalytics | null;
  relevantOrganization?: OrganizationExt | null;
  organizationName?: string | null;
}
export type OrganizationGroupExtViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "organization.analytic.update"
  | "organizationGroup.browse"
  | "organizationGroup.list"
  | "organizationGroup.lookup"
  | "organizationGroup.hrUsersView"
  | "organizationGroupExt-view-for-requisition"
  | "organizationGroupExt.for.attestation.lookup";
export type OrganizationGroupExtView<
  V extends OrganizationGroupExtViewName
> = V extends "_minimal"
  ? Pick<OrganizationGroupExt, "id">
  : V extends "_local"
  ? Pick<
      OrganizationGroupExt,
      | "id"
      | "organizationName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      OrganizationGroupExt,
      | "id"
      | "organizationName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "organization.analytic.update"
  ? Pick<OrganizationGroupExt, "id" | "analytics">
  : V extends "organizationGroup.browse"
  ? Pick<
      OrganizationGroupExt,
      "id" | "list" | "organization" | "organizationName"
    >
  : V extends "organizationGroup.list"
  ? Pick<
      OrganizationGroupExt,
      | "id"
      | "organizationName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "organization"
      | "analytics"
    >
  : V extends "organizationGroup.lookup"
  ? Pick<
      OrganizationGroupExt,
      | "id"
      | "organizationName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "organization"
    >
  : V extends "organizationGroup.hrUsersView"
  ? Pick<
      OrganizationGroupExt,
      | "id"
      | "organizationName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "hrUsers"
    >
  : V extends "organizationGroupExt-view-for-requisition"
  ? Pick<
      OrganizationGroupExt,
      | "id"
      | "organizationName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "organization"
      | "organizationName"
      | "analytics"
    >
  : V extends "organizationGroupExt.for.attestation.lookup"
  ? Pick<
      OrganizationGroupExt,
      "id" | "list" | "organization" | "organizationName"
    >
  : never;
