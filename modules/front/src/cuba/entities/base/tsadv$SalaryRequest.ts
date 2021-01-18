import { AbstractParentEntity } from "./AbstractParentEntity";
import { AssignmentGroupExt } from "./base$AssignmentGroupExt";
import { FileDescriptor } from "./sys$FileDescriptor";
import { DicRequestStatus } from "./tsadv$DicRequestStatus";
import { Salary } from "./tsadv$Salary";
import { DicSalaryChangeReason } from "./tsadv$DicSalaryChangeReason";
import { DicCurrency } from "./base$DicCurrency";
import { OrdAssignment } from "./tsadv$OrdAssignment";
import { OrderGroup } from "./tsadv$OrderGroup";
import { Agreement } from "./tsadv$Agreement";
export class SalaryRequest extends AbstractParentEntity {
  static NAME = "tsadv$SalaryRequest";
  assignmentGroup?: AssignmentGroupExt | null;
  attachment?: FileDescriptor | null;
  note?: string | null;
  requestNumber?: any | null;
  status?: DicRequestStatus | null;
  oldSalary?: Salary | null;
  amount?: any | null;
  changePercent?: any | null;
  netGross?: any | null;
  reason?: DicSalaryChangeReason | null;
  currency?: DicCurrency | null;
  ordAssignment?: OrdAssignment | null;
  startDate?: any | null;
  endDate?: any | null;
  orderGroup?: OrderGroup | null;
  agreement?: Agreement | null;
  isUpdatedManually?: boolean | null;
  type?: any | null;
  difference?: any | null;
}
export type SalaryRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "salary-notification.view"
  | "salary-request.view";
export type SalaryRequestView<
  V extends SalaryRequestViewName
> = V extends "_base"
  ? Pick<
      SalaryRequest,
      | "id"
      | "note"
      | "requestNumber"
      | "amount"
      | "changePercent"
      | "netGross"
      | "startDate"
      | "endDate"
      | "type"
      | "difference"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      SalaryRequest,
      | "id"
      | "note"
      | "requestNumber"
      | "amount"
      | "changePercent"
      | "netGross"
      | "startDate"
      | "endDate"
      | "type"
      | "difference"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "salary-notification.view"
  ? Pick<
      SalaryRequest,
      | "id"
      | "note"
      | "requestNumber"
      | "amount"
      | "changePercent"
      | "netGross"
      | "startDate"
      | "endDate"
      | "type"
      | "difference"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "reason"
      | "assignmentGroup"
      | "status"
      | "oldSalary"
    >
  : V extends "salary-request.view"
  ? Pick<
      SalaryRequest,
      | "id"
      | "note"
      | "requestNumber"
      | "amount"
      | "changePercent"
      | "netGross"
      | "startDate"
      | "endDate"
      | "type"
      | "difference"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "updateTs"
      | "oldSalary"
      | "currency"
      | "reason"
      | "assignmentGroup"
      | "orderGroup"
      | "agreement"
      | "ordAssignment"
      | "status"
      | "attachment"
    >
  : never;
