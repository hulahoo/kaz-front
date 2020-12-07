import { AbstractDictionary } from "./AbstractDictionary";
export class DicDismissalStatus extends AbstractDictionary {
  static NAME = "tsadv$DicDismissalStatus";
}
export type DicDismissalStatusViewName = "_minimal" | "_local" | "_base";
export type DicDismissalStatusView<
  V extends DicDismissalStatusViewName
> = V extends "_minimal"
  ? Pick<DicDismissalStatus, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      DicDismissalStatus,
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
      DicDismissalStatus,
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
