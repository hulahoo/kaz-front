import { AbstractDictionary } from "./AbstractDictionary";
export class DicTalentProgramRequestStatus extends AbstractDictionary {
  static NAME = "tsadv$DicTalentProgramRequestStatus";
}
export type DicTalentProgramRequestStatusViewName =
  | "_minimal"
  | "_local"
  | "_base";
export type DicTalentProgramRequestStatusView<
  V extends DicTalentProgramRequestStatusViewName
> = V extends "_minimal"
  ? Pick<DicTalentProgramRequestStatus, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      DicTalentProgramRequestStatus,
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
      DicTalentProgramRequestStatus,
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
