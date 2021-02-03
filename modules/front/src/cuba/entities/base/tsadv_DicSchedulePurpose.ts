import { AbstractDictionary } from "./AbstractDictionary";
export class DicSchedulePurpose extends AbstractDictionary {
  static NAME = "tsadv_DicSchedulePurpose";
}
export type DicSchedulePurposeViewName = "_base" | "_local" | "_minimal";
export type DicSchedulePurposeView<
  V extends DicSchedulePurposeViewName
> = V extends "_base"
  ? Pick<
      DicSchedulePurpose,
      | "id"
      | "langValue"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
      | "code"
      | "endDate"
      | "startDate"
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
      DicSchedulePurpose,
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
      DicSchedulePurpose,
      | "id"
      | "langValue"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
      | "code"
      | "endDate"
      | "startDate"
    >
  : never;
