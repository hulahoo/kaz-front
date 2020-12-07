import { AbstractGroup } from "./AbstractGroup";
import { Job } from "./tsadv$Job";
import { CompetenceElement } from "./tsadv$CompetenceElement";
import { VacationConditions } from "./tsadv$VacationConditions";
import { Case } from "./tsadv$Case";
import { PerformancePlan } from "./tsadv$PerformancePlan";
import { JobGroupGoalLink } from "./tsadv$JobGroupGoalLink";
import { RcJobGroup } from "./tsadv$RcJobGroup";
export class JobGroup extends AbstractGroup {
  static NAME = "tsadv$JobGroup";
  list?: Job[] | null;
  competence?: CompetenceElement[] | null;
  job?: Job | null;
  vacationConditionsList?: VacationConditions[] | null;
  cases?: Case[] | null;
  performancePlans?: PerformancePlan[] | null;
  goals?: JobGroupGoalLink[] | null;
  rcJobGroups?: RcJobGroup[] | null;
  jobName?: string | null;
}
export type JobGroupViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "jobGroup.browse"
  | "jobGroup.for.requisitions"
  | "jobGroup-name-Ru-En";
export type JobGroupView<V extends JobGroupViewName> = V extends "_minimal"
  ? Pick<JobGroup, "id">
  : V extends "_local"
  ? Pick<
      JobGroup,
      "id" | "jobName" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      JobGroup,
      "id" | "jobName" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "jobGroup.browse"
  ? Pick<
      JobGroup,
      | "id"
      | "jobName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "cases"
    >
  : V extends "jobGroup.for.requisitions"
  ? Pick<
      JobGroup,
      | "id"
      | "jobName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "job"
    >
  : V extends "jobGroup-name-Ru-En"
  ? Pick<
      JobGroup,
      | "id"
      | "jobName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "job"
    >
  : never;
