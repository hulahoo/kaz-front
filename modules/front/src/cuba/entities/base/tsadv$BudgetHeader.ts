import { AbstractParentEntity } from "./AbstractParentEntity";
import { Budget } from "./tsadv$Budget";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { BudgetRequest } from "./tsadv$BudgetRequest";
export class BudgetHeader extends AbstractParentEntity {
  static NAME = "tsadv$BudgetHeader";
  budget?: Budget | null;
  responsiblePerson?: PersonGroupExt | null;
  headerName?: string | null;
  organizationGroup?: OrganizationGroupExt | null;
  status?: any | null;
  budgetRequests?: BudgetRequest[] | null;
}
export type BudgetHeaderViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "budgetHeader-view"
  | "budgetHeader-with-request";
export type BudgetHeaderView<V extends BudgetHeaderViewName> = V extends "_base"
  ? Pick<
      BudgetHeader,
      | "id"
      | "headerName"
      | "status"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      BudgetHeader,
      | "id"
      | "headerName"
      | "status"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "budgetHeader-view"
  ? Pick<
      BudgetHeader,
      | "id"
      | "headerName"
      | "status"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "budget"
      | "organizationGroup"
      | "responsiblePerson"
      | "updateTs"
    >
  : V extends "budgetHeader-with-request"
  ? Pick<
      BudgetHeader,
      | "id"
      | "headerName"
      | "status"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "budgetRequests"
    >
  : never;
