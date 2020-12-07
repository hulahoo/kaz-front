import { AbstractTimeBasedEntity } from "./AbstractTimeBasedEntity";
import { DicLocation } from "./base$DicLocation";
export class Position extends AbstractTimeBasedEntity {
  static NAME = "base$Position";
  positionName?: string | null;
  positionFullNameLang1?: string | null;
  positionFullNameLang2?: string | null;
  positionFullNameLang3?: string | null;
  positionFullNameLang4?: string | null;
  positionFullNameLang5?: string | null;
  positionNameLang1?: string | null;
  positionNameLang2?: string | null;
  positionNameLang3?: string | null;
  positionNameLang4?: string | null;
  positionNameLang5?: string | null;
  location?: DicLocation | null;
  managerFlag?: boolean | null;
  fte?: any | null;
  maxPersons?: number | null;
}
export type PositionViewName = "_minimal" | "_local" | "_base";
export type PositionView<V extends PositionViewName> = V extends "_minimal"
  ? Pick<Position, "id" | "positionName">
  : V extends "_local"
  ? Pick<
      Position,
      | "id"
      | "positionFullNameLang1"
      | "positionFullNameLang2"
      | "positionFullNameLang3"
      | "positionFullNameLang4"
      | "positionFullNameLang5"
      | "positionNameLang1"
      | "positionNameLang2"
      | "positionNameLang3"
      | "positionNameLang4"
      | "positionNameLang5"
      | "managerFlag"
      | "fte"
      | "maxPersons"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : V extends "_base"
  ? Pick<
      Position,
      | "id"
      | "positionName"
      | "positionFullNameLang1"
      | "positionFullNameLang2"
      | "positionFullNameLang3"
      | "positionFullNameLang4"
      | "positionFullNameLang5"
      | "positionNameLang1"
      | "positionNameLang2"
      | "positionNameLang3"
      | "positionNameLang4"
      | "positionNameLang5"
      | "managerFlag"
      | "fte"
      | "maxPersons"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : never;
