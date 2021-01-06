import { AbstractDictionary } from "./AbstractDictionary";
export class DicRcQuestionnaireStatus extends AbstractDictionary {
  static NAME = "tsadv$DicRcQuestionnaireStatus";
}
export type DicRcQuestionnaireStatusViewName = "_base" | "_local" | "_minimal";
export type DicRcQuestionnaireStatusView<
  V extends DicRcQuestionnaireStatusViewName
> = V extends "_base"
  ? Pick<
      DicRcQuestionnaireStatus,
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
  : V extends "_local"
  ? Pick<
      DicRcQuestionnaireStatus,
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
  ? Pick<DicRcQuestionnaireStatus, "id" | "langValue">
  : never;
