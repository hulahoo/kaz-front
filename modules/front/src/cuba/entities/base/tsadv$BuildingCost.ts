import { AbstractParentEntity } from "./AbstractParentEntity";
import { Buildings } from "./tsadv$Buildings";
export class BuildingCost extends AbstractParentEntity {
  static NAME = "tsadv$BuildingCost";
  costDate?: any | null;
  balanceCost?: any | null;
  residualValue?: any | null;
  buildings?: Buildings | null;
}
export type BuildingCostViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "buildingCost-view";
export type BuildingCostView<
  V extends BuildingCostViewName
> = V extends "_local"
  ? Pick<
      BuildingCost,
      | "id"
      | "costDate"
      | "balanceCost"
      | "residualValue"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      BuildingCost,
      | "id"
      | "costDate"
      | "balanceCost"
      | "residualValue"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "buildingCost-view"
  ? Pick<BuildingCost, "id" | "costDate" | "balanceCost" | "residualValue">
  : never;
