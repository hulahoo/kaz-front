import { AbstractParentEntity } from "./AbstractParentEntity";
import { BuildingFireSafety } from "./tsadv$BuildingFireSafety";
export class FireWaterSupply extends AbstractParentEntity {
  static NAME = "tsadv$FireWaterSupply";
  equipment?: string | null;
  inventoryNumber?: string | null;
  isWorking?: boolean | null;
  buildingFireSafety?: BuildingFireSafety | null;
}
export type FireWaterSupplyViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "fireWaterSupply-view";
export type FireWaterSupplyView<
  V extends FireWaterSupplyViewName
> = V extends "_base"
  ? Pick<
      FireWaterSupply,
      | "id"
      | "equipment"
      | "inventoryNumber"
      | "isWorking"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      FireWaterSupply,
      | "id"
      | "equipment"
      | "inventoryNumber"
      | "isWorking"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "fireWaterSupply-view"
  ? Pick<FireWaterSupply, "id" | "equipment" | "inventoryNumber" | "isWorking">
  : never;
