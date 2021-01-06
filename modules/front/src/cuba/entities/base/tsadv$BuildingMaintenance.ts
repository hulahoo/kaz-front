import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { Buildings } from "./tsadv$Buildings";
export class BuildingMaintenance extends AbstractParentEntity {
  static NAME = "tsadv$BuildingMaintenance";
  managerFullName?: PersonGroupExt | null;
  responsibleFullName?: PersonGroupExt | null;
  inspectionReport?: string | null;
  technicalResolution?: string | null;
  maintenanceProhibition?: boolean | null;
  technicalJournalRecord?: string | null;
  currentRepairs?: string | null;
  rebuilding?: string | null;
  contractingOrganization?: string | null;
  onBalance?: boolean | null;
  dismantled?: boolean | null;
  unmaintenance?: boolean | null;
  onConservation?: boolean | null;
  writeOfDate?: any | null;
  dismantlingDate?: any | null;
  buildings?: Buildings | null;
}
export type BuildingMaintenanceViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "buildingMaintenance-view";
export type BuildingMaintenanceView<
  V extends BuildingMaintenanceViewName
> = V extends "_base"
  ? Pick<
      BuildingMaintenance,
      | "id"
      | "inspectionReport"
      | "technicalResolution"
      | "maintenanceProhibition"
      | "technicalJournalRecord"
      | "currentRepairs"
      | "rebuilding"
      | "contractingOrganization"
      | "onBalance"
      | "dismantled"
      | "unmaintenance"
      | "onConservation"
      | "writeOfDate"
      | "dismantlingDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      BuildingMaintenance,
      | "id"
      | "inspectionReport"
      | "technicalResolution"
      | "maintenanceProhibition"
      | "technicalJournalRecord"
      | "currentRepairs"
      | "rebuilding"
      | "contractingOrganization"
      | "onBalance"
      | "dismantled"
      | "unmaintenance"
      | "onConservation"
      | "writeOfDate"
      | "dismantlingDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "buildingMaintenance-view"
  ? Pick<
      BuildingMaintenance,
      | "id"
      | "managerFullName"
      | "responsibleFullName"
      | "inspectionReport"
      | "technicalResolution"
      | "maintenanceProhibition"
      | "technicalJournalRecord"
      | "currentRepairs"
      | "rebuilding"
      | "contractingOrganization"
      | "onBalance"
      | "dismantled"
      | "unmaintenance"
      | "onConservation"
      | "writeOfDate"
      | "dismantlingDate"
    >
  : never;
