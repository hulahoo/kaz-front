import { AbstractParentEntity } from "./AbstractParentEntity";
import { MedicalService } from "./tsadv$MedicalService";
import { Attachment } from "./tsadv$Attachment";
import { MedicalInspectionResult } from "./tsadv$MedicalInspectionResult";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
export class MedicalInspection extends AbstractParentEntity {
  static NAME = "tsadv$MedicalInspection";
  entryDate?: any | null;
  service?: MedicalService[] | null;
  attachment?: Attachment[] | null;
  result?: MedicalInspectionResult[] | null;
  organization?: OrganizationGroupExt | null;
  factEmpNumber?: any | null;
  subjectInspection?: any | null;
  subjectInspectionWoman?: any | null;
  passedInspection?: any | null;
}
export type MedicalInspectionViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "medicalInspection-view";
export type MedicalInspectionView<
  V extends MedicalInspectionViewName
> = V extends "_base"
  ? Pick<
      MedicalInspection,
      | "id"
      | "entryDate"
      | "factEmpNumber"
      | "subjectInspection"
      | "subjectInspectionWoman"
      | "passedInspection"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      MedicalInspection,
      | "id"
      | "entryDate"
      | "factEmpNumber"
      | "subjectInspection"
      | "subjectInspectionWoman"
      | "passedInspection"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "medicalInspection-view"
  ? Pick<
      MedicalInspection,
      | "id"
      | "entryDate"
      | "organization"
      | "factEmpNumber"
      | "subjectInspection"
      | "subjectInspectionWoman"
      | "passedInspection"
      | "service"
      | "attachment"
      | "result"
    >
  : never;
