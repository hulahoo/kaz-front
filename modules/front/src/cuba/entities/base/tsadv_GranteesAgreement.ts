import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicAgreementStatus } from "./tsadv$DicAgreementStatus";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class GranteesAgreement extends AbstractParentEntity {
  static NAME = "tsadv_GranteesAgreement";
  contractNumber?: string | null;
  contractDate?: any | null;
  university?: string | null;
  agreementNumber?: string | null;
  agreementDate?: any | null;
  startYear?: number | null;
  status?: DicAgreementStatus | null;
  personGroup?: PersonGroupExt | null;
}
export type GranteesAgreementViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "granteesAgreement.edit";
export type GranteesAgreementView<
  V extends GranteesAgreementViewName
> = V extends "_base"
  ? Pick<
      GranteesAgreement,
      | "id"
      | "agreementNumber"
      | "contractNumber"
      | "contractDate"
      | "university"
      | "agreementDate"
      | "startYear"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      GranteesAgreement,
      | "id"
      | "contractNumber"
      | "contractDate"
      | "university"
      | "agreementNumber"
      | "agreementDate"
      | "startYear"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<GranteesAgreement, "id" | "agreementNumber">
  : V extends "granteesAgreement.edit"
  ? Pick<
      GranteesAgreement,
      | "id"
      | "contractNumber"
      | "contractDate"
      | "university"
      | "agreementNumber"
      | "agreementDate"
      | "startYear"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "status"
      | "personGroup"
    >
  : never;
