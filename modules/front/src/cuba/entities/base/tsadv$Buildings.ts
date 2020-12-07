import { AbstractParentEntity } from "./AbstractParentEntity";
import { RepairsDismantling } from "./tsadv$RepairsDismantling";
import { BuildingMaintenance } from "./tsadv$BuildingMaintenance";
import { Attachment } from "./tsadv$Attachment";
import { BuildingTechnicalInspections } from "./tsadv$BuildingTechnicalInspections";
import { TechnicalStatus } from "./tsadv$TechnicalStatus";
import { BuildingCost } from "./tsadv$BuildingCost";
import { ObjectType } from "./tsadv$ObjectType";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
export class Buildings extends AbstractParentEntity {
  static NAME = "tsadv$Buildings";
  name?: string | null;
  dismantling?: RepairsDismantling[] | null;
  maintenance?: BuildingMaintenance[] | null;
  attachment?: Attachment[] | null;
  inspection?: BuildingTechnicalInspections[] | null;
  techStatus?: TechnicalStatus[] | null;
  cost?: BuildingCost[] | null;
  objectType?: ObjectType | null;
  organization?: OrganizationGroupExt | null;
  commissioning?: any | null;
  buildingVolume?: any | null;
  buildingArea?: any | null;
  totalArea?: any | null;
  technicalPassport?: boolean | null;
  buildingPassport?: boolean | null;
  technicalJournal?: boolean | null;
  inventoryNumber?: string | null;
  oldInventoryNumber?: string | null;
}
export type BuildingsViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "buildings-view";
export type BuildingsView<V extends BuildingsViewName> = V extends "_minimal"
  ? Pick<Buildings, "id" | "name">
  : V extends "_local"
  ? Pick<
      Buildings,
      | "id"
      | "name"
      | "commissioning"
      | "buildingVolume"
      | "buildingArea"
      | "totalArea"
      | "technicalPassport"
      | "buildingPassport"
      | "technicalJournal"
      | "inventoryNumber"
      | "oldInventoryNumber"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      Buildings,
      | "id"
      | "name"
      | "commissioning"
      | "buildingVolume"
      | "buildingArea"
      | "totalArea"
      | "technicalPassport"
      | "buildingPassport"
      | "technicalJournal"
      | "inventoryNumber"
      | "oldInventoryNumber"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "buildings-view"
  ? Pick<
      Buildings,
      | "id"
      | "name"
      | "objectType"
      | "organization"
      | "commissioning"
      | "buildingVolume"
      | "buildingArea"
      | "totalArea"
      | "technicalPassport"
      | "buildingPassport"
      | "technicalJournal"
      | "inventoryNumber"
      | "oldInventoryNumber"
      | "techStatus"
      | "attachment"
      | "maintenance"
      | "dismantling"
      | "inspection"
      | "cost"
    >
  : never;
