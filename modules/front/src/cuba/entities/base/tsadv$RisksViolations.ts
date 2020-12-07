import { AbstractDictionary } from "./AbstractDictionary";
export class RisksViolations extends AbstractDictionary {
  static NAME = "tsadv$RisksViolations";
}
export type RisksViolationsViewName = "_minimal" | "_local" | "_base";
export type RisksViolationsView<
  V extends RisksViolationsViewName
> = V extends "_minimal"
  ? Pick<RisksViolations, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      RisksViolations,
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
      RisksViolations,
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
