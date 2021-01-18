import { AbstractParentEntity } from "./AbstractParentEntity";
import { MedicalInspection } from "./tsadv$MedicalInspection";
export class MedicalService extends AbstractParentEntity {
  static NAME = "tsadv$MedicalService";
  agreementDate?: any | null;
  agreementNumber?: any | null;
  medicalCenter?: string | null;
  dateFrom?: any | null;
  dateTo?: any | null;
  cost?: any | null;
  medicalInspection?: MedicalInspection | null;
}
export type MedicalServiceViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "medicalService-view";
export type MedicalServiceView<
  V extends MedicalServiceViewName
> = V extends "_base"
  ? Pick<
      MedicalService,
      | "id"
      | "agreementDate"
      | "agreementNumber"
      | "medicalCenter"
      | "dateFrom"
      | "dateTo"
      | "cost"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      MedicalService,
      | "id"
      | "agreementDate"
      | "agreementNumber"
      | "medicalCenter"
      | "dateFrom"
      | "dateTo"
      | "cost"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "medicalService-view"
  ? Pick<
      MedicalService,
      | "id"
      | "agreementDate"
      | "agreementNumber"
      | "medicalCenter"
      | "dateFrom"
      | "dateTo"
      | "cost"
    >
  : never;
