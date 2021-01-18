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
  | "_base"
  | "_local"
  | "_minimal"
  | "standardShift.view";
export type StandardShiftView<
  V extends StandardShiftViewName
> = V extends "_base"
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
  : V extends "_minimal"
  ? Pick<StandardShift, "id">
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
