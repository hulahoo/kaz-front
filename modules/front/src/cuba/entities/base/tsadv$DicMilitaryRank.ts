import { AbstractDictionary } from "./AbstractDictionary";
import { DicTroopType } from "./tsadv$DicTroopType";
import { DicTroopsStructure } from "./tsadv$DicTroopsStructure";
export class DicMilitaryRank extends AbstractDictionary {
  static NAME = "tsadv$DicMilitaryRank";
  troopType?: DicTroopType | null;
  categoryComposition?: DicTroopsStructure | null;
}
export type DicMilitaryRankViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "dicMilitaryRank-view";
export type DicMilitaryRankView<
  V extends DicMilitaryRankViewName
> = V extends "_base"
  ? Pick<
      DicMilitaryRank,
      | "id"
      | "langValue"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "langValue1"
      | "description1"
      | "langValue2"
      | "description2"
      | "langValue3"
      | "description3"
      | "langValue4"
      | "description4"
      | "langValue5"
      | "description5"
      | "startDate"
      | "endDate"
      | "code"
      | "isSystemRecord"
      | "active"
      | "isDefault"
      | "order"
    >
  : V extends "_local"
  ? Pick<
      DicMilitaryRank,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "langValue1"
      | "description1"
      | "langValue2"
      | "description2"
      | "langValue3"
      | "description3"
      | "langValue4"
      | "description4"
      | "langValue5"
      | "description5"
      | "startDate"
      | "endDate"
      | "code"
      | "isSystemRecord"
      | "active"
      | "isDefault"
      | "order"
    >
  : V extends "_minimal"
  ? Pick<DicMilitaryRank, "id" | "langValue">
  : V extends "dicMilitaryRank-view"
  ? Pick<
      DicMilitaryRank,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "langValue1"
      | "description1"
      | "langValue2"
      | "description2"
      | "langValue3"
      | "description3"
      | "langValue4"
      | "description4"
      | "langValue5"
      | "description5"
      | "startDate"
      | "endDate"
      | "code"
      | "isSystemRecord"
      | "active"
      | "isDefault"
      | "order"
      | "troopType"
      | "categoryComposition"
    >
  : never;
