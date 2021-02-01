import { AbstractDictionary } from "./AbstractDictionary";
export class ControlType extends AbstractDictionary {
  static NAME = "tsadv$ControlType";
}
export type ControlTypeViewName = "_base" | "_local" | "_minimal";
export type ControlTypeView<V extends ControlTypeViewName> = V extends "_base"
  ? Pick<
      ControlType,
      | "id"
      | "langValue"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "description1"
      | "description2"
      | "description3"
      | "description4"
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
      ControlType,
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
  ? Pick<
      ControlType,
      | "id"
      | "langValue"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
    >
  : never;
