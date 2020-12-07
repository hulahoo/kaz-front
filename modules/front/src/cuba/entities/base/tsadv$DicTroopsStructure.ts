import { AbstractDictionary } from "./AbstractDictionary";
export class DicTroopsStructure extends AbstractDictionary {
  static NAME = "tsadv$DicTroopsStructure";
}
export type DicTroopsStructureViewName = "_minimal" | "_local" | "_base";
export type DicTroopsStructureView<
  V extends DicTroopsStructureViewName
> = V extends "_minimal"
  ? Pick<DicTroopsStructure, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      DicTroopsStructure,
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
  : V extends "_base"
  ? Pick<
      DicTroopsStructure,
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
  : never;
