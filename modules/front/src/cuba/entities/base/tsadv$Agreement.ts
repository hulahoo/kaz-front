import { AbstractParentEntity } from "./AbstractParentEntity";
import { AgreementDocument } from "./tsadv$AgreementDocument";
import { DicContractsType } from "./tsadv$DicContractsType";
import { DicAgreementStatus } from "./tsadv$DicAgreementStatus";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class Agreement extends AbstractParentEntity {
  static NAME = "tsadv$Agreement";
  agreementNumber?: string | null;
  suspensionDateFrom?: any | null;
  suspensionDateTo?: any | null;
  files?: AgreementDocument[] | null;
  agreementType?: DicContractsType | null;
  dateFrom?: any | null;
  dateTo?: any | null;
  status?: DicAgreementStatus | null;
  personGroup?: PersonGroupExt | null;
}
export type AgreementViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "agreement.view";
export type AgreementView<V extends AgreementViewName> = V extends "_minimal"
  ? Pick<Agreement, "id" | "agreementNumber">
  : V extends "_local"
  ? Pick<
      Agreement,
      | "id"
      | "agreementNumber"
      | "suspensionDateFrom"
      | "suspensionDateTo"
      | "dateFrom"
      | "dateTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      Agreement,
      | "id"
      | "agreementNumber"
      | "suspensionDateFrom"
      | "suspensionDateTo"
      | "dateFrom"
      | "dateTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "agreement.view"
  ? Pick<
      Agreement,
      | "id"
      | "agreementNumber"
      | "suspensionDateFrom"
      | "suspensionDateTo"
      | "dateFrom"
      | "dateTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "personGroup"
      | "status"
      | "agreementType"
      | "files"
    >
  : never;
