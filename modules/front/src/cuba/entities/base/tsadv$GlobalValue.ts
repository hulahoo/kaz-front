import { AbstractTimeBasedEntity } from "./AbstractTimeBasedEntity";
import { GlobalValueGroup } from "./tsadv$GlobalValueGroup";
export class GlobalValue extends AbstractTimeBasedEntity {
  static NAME = "tsadv$GlobalValue";
  name?: string | null;
  value?: string | null;
  code?: string | null;
  group?: GlobalValueGroup | null;
}
export type GlobalValueViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "globalValue.edit";
export type GlobalValueView<V extends GlobalValueViewName> = V extends "_base"
  ? Pick<
      GlobalValue,
      | "id"
      | "name"
      | "value"
      | "code"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : V extends "_local"
  ? Pick<
      GlobalValue,
      | "id"
      | "name"
      | "value"
      | "code"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : V extends "globalValue.edit"
  ? Pick<
      GlobalValue,
      | "id"
      | "name"
      | "value"
      | "code"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
      | "group"
    >
  : never;
