import { AbstractDictionary } from "./AbstractDictionary";
export class DicAttestationInterviewResult extends AbstractDictionary {
  static NAME = "tsadv$DicAttestationInterviewResult";
}
export type DicAttestationInterviewResultViewName =
  | "_base"
  | "_local"
  | "_minimal";
export type DicAttestationInterviewResultView<
  V extends DicAttestationInterviewResultViewName
> = V extends "_base"
  ? Pick<
      DicAttestationInterviewResult,
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
      DicAttestationInterviewResult,
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
  ? Pick<DicAttestationInterviewResult, "id" | "langValue">
  : never;
