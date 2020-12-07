import { AbstractDictionary } from "./AbstractDictionary";
export class DicLearningHistoryStatus extends AbstractDictionary {
  static NAME = "tsadv$DicLearningHistoryStatus";
}
export type DicLearningHistoryStatusViewName = "_minimal" | "_local" | "_base";
export type DicLearningHistoryStatusView<
  V extends DicLearningHistoryStatusViewName
> = V extends "_minimal"
  ? Pick<DicLearningHistoryStatus, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      DicLearningHistoryStatus,
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
      DicLearningHistoryStatus,
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
