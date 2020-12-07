import { AbstractDictionary } from "./AbstractDictionary";
export class DicNineBoxLevel extends AbstractDictionary {
  static NAME = "tsadv$DicNineBoxLevel";
}
export type DicNineBoxLevelViewName = "_minimal" | "_local" | "_base";
export type DicNineBoxLevelView<
  V extends DicNineBoxLevelViewName
> = V extends "_minimal"
  ? Pick<DicNineBoxLevel, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      DicNineBoxLevel,
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
      DicNineBoxLevel,
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
