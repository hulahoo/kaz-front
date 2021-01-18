import { AbstractParentEntity } from "./AbstractParentEntity";
import { MedicalInspection } from "./tsadv$MedicalInspection";
export class MedicalInspectionResult extends AbstractParentEntity {
  static NAME = "tsadv$MedicalInspectionResult";
  withDiseases?: number | null;
  riskGroup?: number | null;
  tradeunionCenterSent?: number | null;
  temporaryUnfit?: number | null;
  constantlyUnfit?: number | null;
  medicalInspection?: MedicalInspection | null;
}
export type MedicalInspectionResultViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "medicalInspectionResult-view";
export type MedicalInspectionResultView<
  V extends MedicalInspectionResultViewName
> = V extends "_base"
  ? Pick<
      MedicalInspectionResult,
      | "id"
      | "withDiseases"
      | "riskGroup"
      | "tradeunionCenterSent"
      | "temporaryUnfit"
      | "constantlyUnfit"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      MedicalInspectionResult,
      | "id"
      | "withDiseases"
      | "riskGroup"
      | "tradeunionCenterSent"
      | "temporaryUnfit"
      | "constantlyUnfit"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "medicalInspectionResult-view"
  ? Pick<
      MedicalInspectionResult,
      | "id"
      | "withDiseases"
      | "riskGroup"
      | "tradeunionCenterSent"
      | "temporaryUnfit"
      | "constantlyUnfit"
    >
  : never;
