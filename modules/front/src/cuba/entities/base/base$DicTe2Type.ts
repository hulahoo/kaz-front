import { AbstractDictionary } from "./AbstractDictionary";
export class DicTe2Type extends AbstractDictionary {
  static NAME = "base$DicTe2Type";
  shortNameLang1?: string | null;
  shortNameLang2?: string | null;
  shortNameLang3?: string | null;
  shortNameLang4?: string | null;
  shortNameLang5?: string | null;
}
export type DicTe2TypeViewName = "_minimal" | "_local" | "_base";
export type DicTe2TypeView<V extends DicTe2TypeViewName> = V extends "_minimal"
  ? Pick<DicTe2Type, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      DicTe2Type,
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
      DicTe2Type,
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
