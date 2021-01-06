import { AbstractParentEntity } from "./AbstractParentEntity";
import { Buildings } from "./tsadv$Buildings";
export class RepairsDismantling extends AbstractParentEntity {
  static NAME = "tsadv$RepairsDismantling";
  workType?: string | null;
  workNumber?: any | null;
  workCost?: any | null;
  buildings?: Buildings | null;
}
export type RepairsDismantlingViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "repairsDismantling-view";
export type RepairsDismantlingView<
  V extends RepairsDismantlingViewName
> = V extends "_base"
  ? Pick<
      RepairsDismantling,
      | "id"
      | "workType"
      | "workNumber"
      | "workCost"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      RepairsDismantling,
      | "id"
      | "workType"
      | "workNumber"
      | "workCost"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "repairsDismantling-view"
  ? Pick<RepairsDismantling, "id" | "workType" | "workNumber" | "workCost">
  : never;
