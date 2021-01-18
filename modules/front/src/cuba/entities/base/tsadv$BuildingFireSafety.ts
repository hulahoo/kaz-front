import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicFireSafetyCategory } from "./tsadv$DicFireSafetyCategory";
import { FireWaterSupply } from "./tsadv$FireWaterSupply";
import { DicFireResistance } from "./tsadv$DicFireResistance";
import { BuildingTechnicalInspections } from "./tsadv$BuildingTechnicalInspections";
export class BuildingFireSafety extends AbstractParentEntity {
  static NAME = "tsadv$BuildingFireSafety";
  fsBuildingCategory?: DicFireSafetyCategory | null;
  fsOutdoorCategory?: DicFireSafetyCategory | null;
  agreement?: string | null;
  fireWaterSupply?: FireWaterSupply[] | null;
  fireResistance?: DicFireResistance | null;
  fireAutomationRequired?: boolean | null;
  buildingTechnicalInspections?: BuildingTechnicalInspections | null;
}
export type BuildingFireSafetyViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "buildingFireSafety-view";
export type BuildingFireSafetyView<
  V extends BuildingFireSafetyViewName
> = V extends "_base"
  ? Pick<
      BuildingFireSafety,
      | "id"
      | "agreement"
      | "fireAutomationRequired"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      BuildingFireSafety,
      | "id"
      | "agreement"
      | "fireAutomationRequired"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "buildingFireSafety-view"
  ? Pick<
      BuildingFireSafety,
      | "id"
      | "fsBuildingCategory"
      | "fsOutdoorCategory"
      | "fireWaterSupply"
      | "fireResistance"
      | "fireAutomationRequired"
      | "agreement"
    >
  : never;
