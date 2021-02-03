import { OrganizationGroup } from "./base$OrganizationGroup";
import { OrganizationExt } from "./base$OrganizationExt";
import { DicCompany } from "./base_DicCompany";
import { DicCostCenter } from "./tsadv$DicCostCenter";
import { DicPayroll } from "./tsadv$DicPayroll";
import { DicLocation } from "./base$DicLocation";
import { DicOrgType } from "./base$DicOrgType";
import { PositionExt } from "./base$PositionExt";
import { CompetenceElement } from "./tsadv$CompetenceElement";
import { OrganizationHrUser } from "./tsadv$OrganizationHrUser";
import { Case } from "./tsadv$Case";
import { PerformancePlan } from "./tsadv$PerformancePlan";
import { OrganizationGroupGoalLink } from "./tsadv$OrganizationGroupGoalLink";
import { OrgAnalytics } from "./tsadv$OrgAnalytics";
export class OrganizationGroupExt extends OrganizationGroup {
  static NAME = "base$OrganizationGroupExt";
  organizationName?: string | null;
  list?: OrganizationExt[] | null;
  company?: DicCompany | null;
  costCenter?: DicCostCenter | null;
  payroll?: DicPayroll | null;
  is_internal?: boolean | null;
  organizationNameLang1?: string | null;
  organizationNameLang2?: string | null;
  organizationNameLang3?: string | null;
  organizationNameLang4?: string | null;
  organizationNameLang5?: string | null;
  location?: DicLocation | null;
  organizationType?: DicOrgType | null;
  position?: PositionExt[] | null;
  organization?: OrganizationExt | null;
  competenceElements?: CompetenceElement[] | null;
  hrUsers?: OrganizationHrUser[] | null;
  cases?: Case[] | null;
  performancePlans?: PerformancePlan[] | null;
  goals?: OrganizationGroupGoalLink[] | null;
  analytics?: OrgAnalytics | null;
  relevantOrganization?: OrganizationExt | null;
}
export type OrganizationGroupExtViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "organization.analytic.update"
  | "organizationGroup.browse"
  | "organizationGroup.hrUsersView"
  | "organizationGroup.list"
  | "organizationGroup.lookup"
  | "organizationGroupExt-receptionAssignment"
  | "organizationGroupExt-view-for-requisition"
  | "organizationGroupExt.for.attestation.lookup";
export type OrganizationGroupExtView<
  V extends OrganizationGroupExtViewName
> = V extends "_base"
  ? Pick<
      OrganizationGroupExt,
      | "id"
      | "organizationName"
      | "is_internal"
      | "organizationNameLang1"
      | "organizationNameLang2"
      | "organizationNameLang3"
      | "organizationNameLang4"
      | "organizationNameLang5"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      OrganizationGroupExt,
      | "id"
      | "is_internal"
      | "organizationNameLang1"
      | "organizationNameLang2"
      | "organizationNameLang3"
      | "organizationNameLang4"
      | "organizationNameLang5"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<OrganizationGroupExt, "id" | "organizationName">
  : V extends "organization.analytic.update"
  ? Pick<OrganizationGroupExt, "id" | "organizationName" | "analytics">
  : V extends "organizationGroup.browse"
  ? Pick<
      OrganizationGroupExt,
      | "id"
      | "organizationName"
      | "list"
      | "company"
      | "organization"
      | "analytics"
    >
  : V extends "organizationGroup.hrUsersView"
  ? Pick<
      OrganizationGroupExt,
      | "id"
      | "is_internal"
      | "organizationNameLang1"
      | "organizationNameLang2"
      | "organizationNameLang3"
      | "organizationNameLang4"
      | "organizationNameLang5"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "hrUsers"
    >
  : V extends "organizationGroup.list"
  ? Pick<
      OrganizationGroupExt,
      | "id"
      | "is_internal"
      | "organizationNameLang1"
      | "organizationNameLang2"
      | "organizationNameLang3"
      | "organizationNameLang4"
      | "organizationNameLang5"
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
      | "is_internal"
      | "organizationNameLang1"
      | "organizationNameLang2"
      | "organizationNameLang3"
      | "organizationNameLang4"
      | "organizationNameLang5"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "organization"
    >
  : V extends "organizationGroupExt-receptionAssignment"
  ? Pick<
      OrganizationGroupExt,
      | "id"
      | "is_internal"
      | "organizationNameLang1"
      | "organizationNameLang2"
      | "organizationNameLang3"
      | "organizationNameLang4"
      | "organizationNameLang5"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "organization"
      | "analytics"
    >
  : V extends "organizationGroupExt-view-for-requisition"
  ? Pick<
      OrganizationGroupExt,
      | "id"
      | "is_internal"
      | "organizationNameLang1"
      | "organizationNameLang2"
      | "organizationNameLang3"
      | "organizationNameLang4"
      | "organizationNameLang5"
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
      "id" | "organizationName" | "list" | "organization" | "organizationName"
    >
  : never;
