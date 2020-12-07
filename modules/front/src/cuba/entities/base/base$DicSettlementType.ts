import { AbstractDictionary } from "./AbstractDictionary";
export class DicSettlementType extends AbstractDictionary {
  static NAME = "base$DicSettlementType";
  shortNameLang1?: string | null;
  shortNameLang2?: string | null;
  shortNameLang3?: string | null;
  shortNameLang4?: string | null;
  shortNameLang5?: string | null;
}
export type DicSettlementTypeViewName = "_minimal" | "_local" | "_base";
export type DicSettlementTypeView<
  V extends DicSettlementTypeViewName
> = V extends "_minimal"
  ? Pick<DicSettlementType, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      DicSettlementType,
      | "id"
      | "shortNameLang1"
      | "shortNameLang2"
      | "shortNameLang3"
      | "shortNameLang4"
      | "shortNameLang5"
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
      DicSettlementType,
      | "id"
      | "langValue"
      | "shortNameLang1"
      | "shortNameLang2"
      | "shortNameLang3"
      | "shortNameLang4"
      | "shortNameLang5"
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
