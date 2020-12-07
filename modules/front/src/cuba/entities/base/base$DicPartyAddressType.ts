import { AbstractSortableDictionary } from "./AbstractSortableDictionary";
export class DicPartyAddressType extends AbstractSortableDictionary {
  static NAME = "base$DicPartyAddressType";
  partyType?: any | null;
  primary?: boolean | null;
}
export type DicPartyAddressTypeViewName = "_minimal" | "_local" | "_base";
export type DicPartyAddressTypeView<
  V extends DicPartyAddressTypeViewName
> = V extends "_minimal"
  ? Pick<
      DicPartyAddressType,
      | "id"
      | "languageValue"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
    >
  : V extends "_local"
  ? Pick<
      DicPartyAddressType,
      | "id"
      | "partyType"
      | "primary"
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
      | "languageValue"
    >
  : V extends "_base"
  ? Pick<
      DicPartyAddressType,
      | "id"
      | "languageValue"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
      | "partyType"
      | "primary"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "description1"
      | "description2"
      | "description3"
      | "description4"
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
