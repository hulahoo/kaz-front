import { AbstractParentEntity } from "./AbstractParentEntity";
import { GranteesAgreement } from "./tsadv_GranteesAgreement";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class Payments extends AbstractParentEntity {
  static NAME = "tsadv_Payments";
  granteesAgreement?: GranteesAgreement | null;
  personGroup?: PersonGroupExt | null;
  account?: string | null;
  accountName?: string | null;
  paymentDate?: any | null;
  amount?: any | null;
  note?: string | null;
}
export type PaymentsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "payments.edit";
export type PaymentsView<V extends PaymentsViewName> = V extends "_base"
  ? Pick<
      Payments,
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
      Payments,
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
  : V extends "payments.edit"
  ? Pick<
      Payments,
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
      | "personGroup"
    >
  : never;
