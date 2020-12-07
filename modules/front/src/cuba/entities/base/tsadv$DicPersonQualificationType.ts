import { AbstractDictionary } from "./AbstractDictionary";
export class DicPersonQualificationType extends AbstractDictionary {
  static NAME = "tsadv$DicPersonQualificationType";
}
export type DicPersonQualificationTypeViewName =
  | "_minimal"
  | "_local"
  | "_base";
export type DicPersonQualificationTypeView<
  V extends DicPersonQualificationTypeViewName
> = V extends "_minimal"
  ? Pick<DicPersonQualificationType, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      DicPersonQualificationType,
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
      DicPersonQualificationType,
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
