import { AbstractDictionary } from "./AbstractDictionary";
export class DicAttestationResult extends AbstractDictionary {
  static NAME = "tsadv$DicAttestationResult";
}
export type DicAttestationResultViewName = "_base" | "_local" | "_minimal";
export type DicAttestationResultView<
  V extends DicAttestationResultViewName
> = V extends "_base"
  ? Pick<
      DicAttestationResult,
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
      DicAttestationResult,
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
  ? Pick<DicAttestationResult, "id" | "langValue">
  : never;
