import { AbstractDictionary } from "./AbstractDictionary";
export class DicAbsencePurpose extends AbstractDictionary {
  static NAME = "tsadv_DicAbsencePurpose";
}
export type DicAbsencePurposeViewName = "_base" | "_local" | "_minimal";
export type DicAbsencePurposeView<
  V extends DicAbsencePurposeViewName
> = V extends "_base"
  ? Pick<
      DicAbsencePurpose,
      | "id"
      | "langValue"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
      | "code"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "description1"
      | "description2"
      | "description3"
      | "description4"
      | "description5"
      | "isSystemRecord"
      | "active"
      | "isDefault"
      | "order"
    >
  : V extends "_local"
  ? Pick<
      DicAbsencePurpose,
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
  ? Pick<
      DicAbsencePurpose,
      | "id"
      | "langValue"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
      | "code"
      | "startDate"
      | "endDate"
    >
  : never;
