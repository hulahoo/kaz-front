import { AbstractParentEntity } from "./AbstractParentEntity";
import { ShiftDetail } from "./tsadv$ShiftDetail";
export class Shift extends AbstractParentEntity {
  static NAME = "tsadv$Shift";
  name?: string | null;
  code?: string | null;
  description?: string | null;
  dateFrom?: any | null;
  dateTo?: any | null;
  details?: ShiftDetail[] | null;
}
export type ShiftViewName = "_minimal" | "_local" | "_base" | "shift.view";
export type ShiftView<V extends ShiftViewName> = V extends "_minimal"
  ? Pick<Shift, "id">
  : V extends "_local"
  ? Pick<
      Shift,
      | "id"
      | "name"
      | "code"
      | "description"
      | "dateFrom"
      | "dateTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      Shift,
      | "id"
      | "name"
      | "code"
      | "description"
      | "dateFrom"
      | "dateTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "shift.view"
  ? Pick<
      Shift,
      | "id"
      | "name"
      | "code"
      | "description"
      | "dateFrom"
      | "dateTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "details"
    >
  : never;
