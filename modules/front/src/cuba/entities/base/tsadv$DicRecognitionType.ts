import { AbstractDictionary } from "./AbstractDictionary";
import { FileDescriptor } from "./sys$FileDescriptor";
export class DicRecognitionType extends AbstractDictionary {
  static NAME = "tsadv$DicRecognitionType";
  coins?: any | null;
  emptySticker?: FileDescriptor | null;
  allowCoinsEdit?: boolean | null;
  sticker?: FileDescriptor | null;
}
export type DicRecognitionTypeViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "dicRecognitionType.edit";
export type DicRecognitionTypeView<
  V extends DicRecognitionTypeViewName
> = V extends "_base"
  ? Pick<
      DicRecognitionType,
      | "id"
      | "langValue"
      | "coins"
      | "allowCoinsEdit"
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
      DicRecognitionType,
      | "id"
      | "coins"
      | "allowCoinsEdit"
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
  ? Pick<DicRecognitionType, "id" | "langValue">
  : V extends "dicRecognitionType.edit"
  ? Pick<
      DicRecognitionType,
      | "id"
      | "coins"
      | "allowCoinsEdit"
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
      | "sticker"
      | "emptySticker"
    >
  : never;
