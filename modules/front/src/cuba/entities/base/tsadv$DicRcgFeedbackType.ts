import { AbstractDictionary } from "./AbstractDictionary";
import { FileDescriptor } from "./sys$FileDescriptor";
export class DicRcgFeedbackType extends AbstractDictionary {
  static NAME = "tsadv$DicRcgFeedbackType";
  image?: FileDescriptor | null;
  color?: string | null;
}
export type DicRcgFeedbackTypeViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "dicRcgFeedbackType.edit";
export type DicRcgFeedbackTypeView<
  V extends DicRcgFeedbackTypeViewName
> = V extends "_base"
  ? Pick<
      DicRcgFeedbackType,
      | "id"
      | "langValue"
      | "color"
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
      DicRcgFeedbackType,
      | "id"
      | "color"
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
  ? Pick<DicRcgFeedbackType, "id" | "langValue">
  : V extends "dicRcgFeedbackType.edit"
  ? Pick<
      DicRcgFeedbackType,
      | "id"
      | "color"
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
      | "image"
    >
  : never;
