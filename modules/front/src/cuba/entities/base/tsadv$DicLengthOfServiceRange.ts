import { AbstractDictionary } from "./AbstractDictionary";
export class DicLengthOfServiceRange extends AbstractDictionary {
  static NAME = "tsadv$DicLengthOfServiceRange";
  rangeOrder?: number | null;
  min?: any | null;
  max?: any | null;
}
export type DicLengthOfServiceRangeViewName = "_base" | "_local" | "_minimal";
export type DicLengthOfServiceRangeView<
  V extends DicLengthOfServiceRangeViewName
> = V extends "_base"
  ? Pick<
      DicLengthOfServiceRange,
      | "id"
      | "langValue"
      | "min"
      | "max"
      | "rangeOrder"
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
      DicLengthOfServiceRange,
      | "id"
      | "rangeOrder"
      | "min"
      | "max"
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
  ? Pick<DicLengthOfServiceRange, "id" | "langValue" | "min" | "max">
  : never;
