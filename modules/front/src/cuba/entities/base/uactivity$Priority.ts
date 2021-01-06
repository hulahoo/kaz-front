import { AbstractDictionary } from "./AbstractDictionary";
export class Priority extends AbstractDictionary {
  static NAME = "uactivity$Priority";
  style?: any | null;
}
export type PriorityViewName = "_base" | "_local" | "_minimal";
export type PriorityView<V extends PriorityViewName> = V extends "_base"
  ? Pick<
      Priority,
      | "id"
      | "langValue"
      | "style"
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
      Priority,
      | "id"
      | "style"
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
  ? Pick<Priority, "id" | "langValue">
  : never;
