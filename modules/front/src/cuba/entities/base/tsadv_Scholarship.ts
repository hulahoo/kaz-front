import { AbstractParentEntity } from "./AbstractParentEntity";
import { GranteesAgreement } from "./tsadv_GranteesAgreement";
export class Scholarship extends AbstractParentEntity {
  static NAME = "tsadv_Scholarship";
  granteesAgreement?: GranteesAgreement | null;
  account?: string | null;
  accountName?: string | null;
  paymentDate?: any | null;
  amount?: any | null;
  note?: string | null;
}
export type ScholarshipViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "scholarship.edit";
export type ScholarshipView<V extends ScholarshipViewName> = V extends "_base"
  ? Pick<
      Scholarship,
      | "id"
      | "account"
      | "accountName"
      | "paymentDate"
      | "amount"
      | "note"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Scholarship,
      | "id"
      | "account"
      | "accountName"
      | "paymentDate"
      | "amount"
      | "note"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "scholarship.edit"
  ? Pick<
      Scholarship,
      | "id"
      | "account"
      | "accountName"
      | "paymentDate"
      | "amount"
      | "note"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "granteesAgreement"
    >
  : never;
