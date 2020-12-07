import { AbstractDictionary } from "./AbstractDictionary";
export class DicAdditionalEducation extends AbstractDictionary {
  static NAME = "tsadv$DicAdditionalEducation";
}
export type DicAdditionalEducationViewName = "_minimal" | "_local" | "_base";
export type DicAdditionalEducationView<
  V extends DicAdditionalEducationViewName
> = V extends "_minimal"
  ? Pick<DicAdditionalEducation, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      DicAdditionalEducation,
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
      DicAdditionalEducation,
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
