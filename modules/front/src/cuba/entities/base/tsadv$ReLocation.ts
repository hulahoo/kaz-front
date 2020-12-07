import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicCity } from "./base$DicCity";
export class ReLocation extends AbstractParentEntity {
  static NAME = "tsadv$ReLocation";
  personGroup?: PersonGroupExt | null;
  city?: DicCity | null;
  description?: string | null;
}
export type ReLocationViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "reLocation.browse"
  | "relocation.card";
export type ReLocationView<V extends ReLocationViewName> = V extends "_local"
  ? Pick<
      ReLocation,
      | "id"
      | "description"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      ReLocation,
      | "id"
      | "description"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "reLocation.browse"
  ? Pick<ReLocation, "id" | "city" | "personGroup" | "description">
  : V extends "relocation.card"
  ? Pick<ReLocation, "id" | "personGroup" | "city" | "description">
  : never;
