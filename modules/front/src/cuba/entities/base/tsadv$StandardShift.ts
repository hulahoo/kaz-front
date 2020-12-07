import { AbstractParentEntity } from "./AbstractParentEntity";
import { StandardSchedule } from "./tsadv$StandardSchedule";
import { Shift } from "./tsadv$Shift";
export class StandardShift extends AbstractParentEntity {
  static NAME = "tsadv$StandardShift";
  standardSchedule?: StandardSchedule | null;
  numberInShift?: number | null;
  shift?: Shift | null;
  shiftDisplay?: string | null;
  shiftDisplayDay?: number | null;
}
export type StandardShiftViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "standardShift.view";
export type StandardShiftView<
  V extends StandardShiftViewName
> = V extends "_minimal"
  ? Pick<StandardShift, "id">
  : V extends "_local"
  ? Pick<
      StandardShift,
      | "id"
      | "numberInShift"
      | "shiftDisplay"
      | "shiftDisplayDay"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      StandardShift,
      | "id"
      | "numberInShift"
      | "shiftDisplay"
      | "shiftDisplayDay"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "standardShift.view"
  ? Pick<
      StandardShift,
      | "id"
      | "numberInShift"
      | "shiftDisplay"
      | "shiftDisplayDay"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "shift"
      | "standardSchedule"
    >
  : never;
