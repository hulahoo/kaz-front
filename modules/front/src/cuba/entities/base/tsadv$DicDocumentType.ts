import { AbstractDictionary } from "./AbstractDictionary";
export class DicDocumentType extends AbstractDictionary {
  static NAME = "tsadv$DicDocumentType";
  foreigner?: boolean | null;
}
export type DicDocumentTypeViewName = "_base" | "_local" | "_minimal";
export type DicDocumentTypeView<
  V extends DicDocumentTypeViewName
> = V extends "_base"
  ? Pick<
      DicDocumentType,
      | "id"
      | "langValue"
      | "foreigner"
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
      DicDocumentType,
      | "id"
      | "foreigner"
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
  ? Pick<DicDocumentType, "id" | "langValue">
  : never;
