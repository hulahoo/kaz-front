import { AbstractParentEntity } from "./AbstractParentEntity";
import { ScaleLevel } from "./tsadv$ScaleLevel";
export class Scale extends AbstractParentEntity {
  static NAME = "tsadv$Scale";
  scaleName?: string | null;
  scaleLevels?: ScaleLevel[] | null;
}
export type ScaleViewName = "_minimal" | "_local" | "_base" | "scale-view";
export type ScaleView<V extends ScaleViewName> = V extends "_minimal"
  ? Pick<Scale, "id" | "scaleName">
  : V extends "_local"
  ? Pick<
      Scale,
      | "id"
      | "scaleName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      Scale,
      | "id"
      | "scaleName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "scale-view"
  ? Pick<
      Scale,
      | "id"
      | "scaleName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "scaleLevels"
    >
  : never;
