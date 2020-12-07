import { AbstractDictionary } from "./AbstractDictionary";
export class ReasonNoProductionConnection extends AbstractDictionary {
  static NAME = "tsadv$ReasonNoProductionConnection";
}
export type ReasonNoProductionConnectionViewName =
  | "_minimal"
  | "_local"
  | "_base";
export type ReasonNoProductionConnectionView<
  V extends ReasonNoProductionConnectionViewName
> = V extends "_minimal"
  ? Pick<ReasonNoProductionConnection, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      ReasonNoProductionConnection,
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
      ReasonNoProductionConnection,
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
