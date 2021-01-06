import { AbstractParentEntity } from "./AbstractParentEntity";
import { SafetyEvent } from "./tsadv$SafetyEvent";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { EventStatus } from "./tsadv$EventStatus";
import { SafetyPlanEvent } from "./tsadv$SafetyPlanEvent";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
export class AssignedEvent extends AbstractParentEntity {
  static NAME = "tsadv$AssignedEvent";
  fact?: any | null;
  parentEvent?: AssignedEvent | null;
  safetyEvent?: SafetyEvent | null;
  assignment?: PersonGroupExt | null;
  assigned?: PersonGroupExt | null;
  status?: EventStatus | null;
  deadline?: any | null;
  investmentPlan?: any | null;
  budgetPlan?: any | null;
  investmentFact?: any | null;
  budgetFact?: any | null;
  safetyPlanEvent?: SafetyPlanEvent | null;
  organization?: OrganizationGroupExt | null;
}
export type AssignedEventViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "assignedEvent-view";
export type AssignedEventView<
  V extends AssignedEventViewName
> = V extends "_base"
  ? Pick<
      AssignedEvent,
      | "id"
      | "fact"
      | "deadline"
      | "investmentPlan"
      | "budgetPlan"
      | "investmentFact"
      | "budgetFact"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      AssignedEvent,
      | "id"
      | "fact"
      | "deadline"
      | "investmentPlan"
      | "budgetPlan"
      | "investmentFact"
      | "budgetFact"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "assignedEvent-view"
  ? Pick<
      AssignedEvent,
      | "id"
      | "fact"
      | "deadline"
      | "investmentPlan"
      | "budgetPlan"
      | "investmentFact"
      | "budgetFact"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "status"
      | "safetyPlanEvent"
      | "assignment"
      | "assigned"
      | "safetyEvent"
      | "parentEvent"
      | "createdBy"
      | "organization"
    >
  : never;
