import { AbstractDictionary } from "./AbstractDictionary";
import { DicIncentiveIndicatorType } from "./tsadv_DicIncentiveIndicatorType";
import { DicIncentiveIndicatorScoreSetting } from "./tsadv_DicIncentiveIndicatorScoreSetting";
export class DicIncentiveIndicators extends AbstractDictionary {
  static NAME = "tsadv_DicIncentiveIndicators";
  general?: boolean | null;
  type?: DicIncentiveIndicatorType | null;
  scoreSettings?: DicIncentiveIndicatorScoreSetting[] | null;
}
export type DicIncentiveIndicatorsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "dicIncentiveIndicators.browse"
  | "dicIncentiveIndicators.edit";
export type DicIncentiveIndicatorsView<
  V extends DicIncentiveIndicatorsViewName
> = V extends "_base"
  ? Pick<
      DicIncentiveIndicators,
      | "id"
      | "langValue"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
      | "general"
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
  : V extends "_local"
  ? Pick<
      DicIncentiveIndicators,
      | "id"
      | "general"
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
      DicIncentiveIndicators,
      | "id"
      | "langValue"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
    >
  : V extends "dicIncentiveIndicators.browse"
  ? Pick<
      DicIncentiveIndicators,
      | "id"
      | "general"
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
      | "type"
    >
  : V extends "dicIncentiveIndicators.edit"
  ? Pick<
      DicIncentiveIndicators,
      | "id"
      | "general"
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
      | "type"
      | "scoreSettings"
    >
  : never;
