import { AbstractParentEntity } from "./AbstractParentEntity";
import { PunishmentType } from "./tsadv$PunishmentType";
import { PersonExt } from "./base$PersonExt";
import { Accidents } from "./tsadv$Accidents";
export class Punishment extends AbstractParentEntity {
  static NAME = "tsadv$PunishmentTb";
  orderDate?: any | null;
  punishmentType?: PunishmentType | null;
  person?: PersonExt | null;
  orderNumber?: any | null;
  punishmentDate?: any | null;
  description?: string | null;
  accidents?: Accidents | null;
}
export type PunishmentViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "punishment-view";
export type PunishmentView<V extends PunishmentViewName> = V extends "_base"
  ? Pick<
      Punishment,
      | "id"
      | "description"
      | "orderDate"
      | "orderNumber"
      | "punishmentDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Punishment,
      | "id"
      | "orderDate"
      | "orderNumber"
      | "punishmentDate"
      | "description"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<Punishment, "id" | "description">
  : V extends "punishment-view"
  ? Pick<
      Punishment,
      | "id"
      | "orderDate"
      | "orderNumber"
      | "punishmentDate"
      | "description"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "punishmentType"
      | "person"
    >
  : never;
