import { AbstractParentEntity } from "./AbstractParentEntity";
import { InspectionCategory } from "./tsadv$InspectionCategory";
import { BuildingFireSafety } from "./tsadv$BuildingFireSafety";
import { EventType } from "./tsadv$EventType";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { TechnicalStatusDictionary } from "./tsadv$TechnicalStatusDictionary";
import { Buildings } from "./tsadv$Buildings";
export class BuildingTechnicalInspections extends AbstractParentEntity {
  static NAME = "tsadv$BuildingTechnicalInspections";
  inspectionCategory?: InspectionCategory | null;
  buildingFireSafety?: BuildingFireSafety[] | null;
  inspectionType?: EventType | null;
  inspectingFullName?: PersonGroupExt | null;
  buildTechnicalStatus?: TechnicalStatusDictionary | null;
  technicalStatusBuildstructures?: TechnicalStatusDictionary | null;
  inspectionDate?: any | null;
  prescriptionNumber?: any | null;
  damageDescription?: string | null;
  recommendations?: string | null;
  technicalJournalRecord?: string | null;
  preparationDeadline?: any | null;
  eliminateEvent?: boolean | null;
  eliminationDeadline?: any | null;
  eliminationOrPostponementNotification?: boolean | null;
  repairProgram?: boolean | null;
  buildings?: Buildings | null;
}
export type BuildingTechnicalInspectionsViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "buildingTechnicalInspections-view";
export type BuildingTechnicalInspectionsView<
  V extends BuildingTechnicalInspectionsViewName
> = V extends "_local"
  ? Pick<
      BuildingTechnicalInspections,
      | "id"
      | "inspectionDate"
      | "prescriptionNumber"
      | "damageDescription"
      | "recommendations"
      | "technicalJournalRecord"
      | "preparationDeadline"
      | "eliminateEvent"
      | "eliminationDeadline"
      | "eliminationOrPostponementNotification"
      | "repairProgram"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      BuildingTechnicalInspections,
      | "id"
      | "inspectionDate"
      | "prescriptionNumber"
      | "damageDescription"
      | "recommendations"
      | "technicalJournalRecord"
      | "preparationDeadline"
      | "eliminateEvent"
      | "eliminationDeadline"
      | "eliminationOrPostponementNotification"
      | "repairProgram"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "buildingTechnicalInspections-view"
  ? Pick<
      BuildingTechnicalInspections,
      | "id"
      | "inspectionCategory"
      | "inspectionType"
      | "inspectingFullName"
      | "buildTechnicalStatus"
      | "technicalStatusBuildstructures"
      | "inspectionDate"
      | "prescriptionNumber"
      | "damageDescription"
      | "recommendations"
      | "technicalJournalRecord"
      | "preparationDeadline"
      | "eliminateEvent"
      | "eliminationDeadline"
      | "eliminationOrPostponementNotification"
      | "repairProgram"
      | "buildingFireSafety"
    >
  : never;
