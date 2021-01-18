import { AbstractTimeBasedEntity } from "./AbstractTimeBasedEntity";
import { AssignmentGroupExt } from "./base$AssignmentGroupExt";
import { SalaryRequest } from "./tsadv$SalaryRequest";
import { DicSalaryChangeReason } from "./tsadv$DicSalaryChangeReason";
import { DicCurrency } from "./base$DicCurrency";
import { OrdAssignment } from "./tsadv$OrdAssignment";
import { OrderGroup } from "./tsadv$OrderGroup";
import { Agreement } from "./tsadv$Agreement";
export class Salary extends AbstractTimeBasedEntity {
  static NAME = "tsadv$Salary";
  assignmentGroup?: AssignmentGroupExt | null;
  salaryRequest?: SalaryRequest | null;
  amount?: any | null;
  netGross?: any | null;
  reason?: DicSalaryChangeReason | null;
  currency?: DicCurrency | null;
  ordAssignment?: OrdAssignment | null;
  orderGroup?: OrderGroup | null;
  agreement?: Agreement | null;
  isUpdatedManually?: boolean | null;
  type?: any | null;
}
export type SalaryViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "salary-for-salary-request.view"
  | "salary.browse"
  | "salary.order.view"
  | "salary.view";
export type SalaryView<V extends SalaryViewName> = V extends "_base"
  ? Pick<
      Salary,
      | "id"
      | "amount"
      | "netGross"
      | "type"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : V extends "_local"
  ? Pick<
      Salary,
      | "id"
      | "amount"
      | "netGross"
      | "type"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : V extends "salary-for-salary-request.view"
  ? Pick<
      Salary,
      | "id"
      | "amount"
      | "currency"
      | "netGross"
      | "reason"
      | "assignmentGroup"
      | "startDate"
      | "type"
      | "endDate"
    >
  : V extends "salary.browse"
  ? Pick<
      Salary,
      | "id"
      | "amount"
      | "netGross"
      | "type"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
      | "assignmentGroup"
      | "currency"
    >
  : V extends "salary.order.view"
  ? Pick<
      Salary,
      | "id"
      | "amount"
      | "netGross"
      | "type"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
      | "assignmentGroup"
      | "currency"
      | "ordAssignment"
    >
  : V extends "salary.view"
  ? Pick<
      Salary,
      | "id"
      | "updatedBy"
      | "amount"
      | "currency"
      | "netGross"
      | "reason"
      | "assignmentGroup"
      | "endDate"
      | "startDate"
      | "orderGroup"
      | "agreement"
      | "ordAssignment"
      | "type"
      | "salaryRequest"
      | "legacyId"
    >
  : never;
