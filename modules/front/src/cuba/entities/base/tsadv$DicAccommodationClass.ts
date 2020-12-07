import { AbstractDictionary } from "./AbstractDictionary";
import { DicAccommodationType } from "./tsadv$DicAccommodationType";
export class DicAccommodationClass extends AbstractDictionary {
  static NAME = "tsadv$DicAccommodationClass";
  dicAccommodationType?: DicAccommodationType | null;
}
export type DicAccommodationClassViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "dicAccommodationClass.all";
export type DicAccommodationClassView<
  V extends DicAccommodationClassViewName
> = V extends "_minimal"
  ? Pick<DicAccommodationClass, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      DicAccommodationClass,
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
      DicAccommodationClass,
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
  : V extends "dicAccommodationClass.all"
  ? Pick<
      DicAccommodationClass,
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
      | "dicAccommodationType"
    >
  : never;
