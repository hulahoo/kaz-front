import { AbstractDictionary } from "./AbstractDictionary";
export class DicCourseFormat extends AbstractDictionary {
  static NAME = "tsadv$DicCourseFormat";
}
export type DicCourseFormatViewName = "_minimal" | "_local" | "_base";
export type DicCourseFormatView<
  V extends DicCourseFormatViewName
> = V extends "_minimal"
  ? Pick<DicCourseFormat, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      DicCourseFormat,
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
      DicCourseFormat,
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
