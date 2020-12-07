import { AbstractDictionary } from "./AbstractDictionary";
import { DicTransportType } from "./tsadv$DicTransportType";
export class DicTransportClass extends AbstractDictionary {
  static NAME = "tsadv$DicTransportClass";
  transportType?: DicTransportType | null;
}
export type DicTransportClassViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "dicTransportClass.all";
export type DicTransportClassView<
  V extends DicTransportClassViewName
> = V extends "_minimal"
  ? Pick<DicTransportClass, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      DicTransportClass,
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
      DicTransportClass,
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
  : V extends "dicTransportClass.all"
  ? Pick<
      DicTransportClass,
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
      | "transportType"
    >
  : never;
