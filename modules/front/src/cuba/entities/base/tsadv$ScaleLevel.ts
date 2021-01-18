import { AbstractParentEntity } from "./AbstractParentEntity";
import { Scale } from "./tsadv$Scale";
export class ScaleLevel extends AbstractParentEntity {
  static NAME = "tsadv$ScaleLevel";
  levelNumber?: number | null;
  levelName?: string | null;
  levelNameLang1?: string | null;
  levelNameLang2?: string | null;
  levelNameLang3?: string | null;
  levelNameLang4?: string | null;
  levelNameLang5?: string | null;
  levelDescriptionLang1?: string | null;
  levelDescriptionLang2?: string | null;
  levelDescriptionLang3?: string | null;
  levelDescriptionLang4?: string | null;
  levelDescriptionLang5?: string | null;
  scale?: Scale | null;
}
export type ScaleLevelViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "scaleLevelOptionDatasource";
export type ScaleLevelView<V extends ScaleLevelViewName> = V extends "_base"
  ? Pick<
      ScaleLevel,
      | "id"
      | "levelNumber"
      | "levelName"
      | "levelNameLang1"
      | "levelNameLang2"
      | "levelNameLang3"
      | "levelNameLang4"
      | "levelNameLang5"
      | "levelDescriptionLang1"
      | "levelDescriptionLang2"
      | "levelDescriptionLang3"
      | "levelDescriptionLang4"
      | "levelDescriptionLang5"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      ScaleLevel,
      | "id"
      | "levelNumber"
      | "levelNameLang1"
      | "levelNameLang2"
      | "levelNameLang3"
      | "levelNameLang4"
      | "levelNameLang5"
      | "levelDescriptionLang1"
      | "levelDescriptionLang2"
      | "levelDescriptionLang3"
      | "levelDescriptionLang4"
      | "levelDescriptionLang5"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<ScaleLevel, "id" | "levelNumber" | "levelName">
  : V extends "scaleLevelOptionDatasource"
  ? Pick<
      ScaleLevel,
      | "id"
      | "levelNumber"
      | "levelNameLang1"
      | "levelNameLang2"
      | "levelNameLang3"
      | "levelNameLang4"
      | "levelNameLang5"
      | "levelDescriptionLang1"
      | "levelDescriptionLang2"
      | "levelDescriptionLang3"
      | "levelDescriptionLang4"
      | "levelDescriptionLang5"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "scale"
    >
  : never;
