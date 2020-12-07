import { AbstractDictionary } from "./AbstractDictionary";
export class DicPunishmentTypes extends AbstractDictionary {
  static NAME = "tsadv$DicPunishmentTypes";
}
export type DicPunishmentTypesViewName = "_minimal" | "_local" | "_base";
export type DicPunishmentTypesView<
  V extends DicPunishmentTypesViewName
> = V extends "_minimal"
  ? Pick<DicPunishmentTypes, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      DicPunishmentTypes,
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
      DicPunishmentTypes,
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
