import { AbstractGroup } from "./AbstractGroup";
import { Job } from "./tsadv$Job";
import { CompetenceElement } from "./tsadv$CompetenceElement";
import { VacationConditions } from "./tsadv$VacationConditions";
import { Case } from "./tsadv$Case";
import { PerformancePlan } from "./tsadv$PerformancePlan";
import { JobGroupGoalLink } from "./tsadv$JobGroupGoalLink";
import { RcJobGroup } from "./tsadv$RcJobGroup";
import { DicEmployeeCategory } from "./tsadv$DicEmployeeCategory";
import { DicJobCategory } from "./tsadv$DicJobCategory";
import { DicCompany } from "./base_DicCompany";
export class JobGroup extends AbstractGroup {
  static NAME = "tsadv$JobGroup";
  jobNameDefault?: string | null;
  jobNameLang1?: string | null;
  jobNameLang2?: string | null;
  jobNameLang3?: string | null;
  jobNameLang4?: string | null;
  jobNameLang5?: string | null;
  list?: Job[] | null;
  competence?: CompetenceElement[] | null;
  job?: Job | null;
  vacationConditionsList?: VacationConditions[] | null;
  cases?: Case[] | null;
  performancePlans?: PerformancePlan[] | null;
  goals?: JobGroupGoalLink[] | null;
  rcJobGroups?: RcJobGroup[] | null;
  employeeCategory?: DicEmployeeCategory | null;
  jobCategory?: DicJobCategory | null;
  company?: DicCompany | null;
  jobName?: string | null;
}
export type JobGroupViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "jobGroup-name-Ru-En"
  | "jobGroup.browse"
  | "jobGroup.for.requisitions";
export type JobGroupView<V extends JobGroupViewName> = V extends "_base"
  ? Pick<
      JobGroup,
      | "id"
      | "jobNameDefault"
      | "jobNameLang1"
      | "jobNameLang2"
      | "jobNameLang3"
      | "jobNameLang4"
      | "jobNameLang5"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      JobGroup,
      | "id"
      | "jobNameLang1"
      | "jobNameLang2"
      | "jobNameLang3"
      | "jobNameLang4"
      | "jobNameLang5"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<JobGroup, "id" | "jobNameDefault">
  : V extends "jobGroup-name-Ru-En"
  ? Pick<
      JobGroup,
      | "id"
      | "jobNameLang1"
      | "jobNameLang2"
      | "jobNameLang3"
      | "jobNameLang4"
      | "jobNameLang5"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "job"
    >
  : V extends "jobGroup.browse"
  ? Pick<
      JobGroup,
      | "id"
      | "jobNameLang1"
      | "jobNameLang2"
      | "jobNameLang3"
      | "jobNameLang4"
      | "jobNameLang5"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "jobNameDefault"
      | "list"
      | "job"
      | "cases"
      | "employeeCategory"
      | "company"
    >
  : V extends "jobGroup.for.requisitions"
  ? Pick<
      JobGroup,
      | "id"
      | "jobNameLang1"
      | "jobNameLang2"
      | "jobNameLang3"
      | "jobNameLang4"
      | "jobNameLang5"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "job"
    >
  : never;
