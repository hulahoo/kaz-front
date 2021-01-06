import { AbstractGroup } from "./AbstractGroup";
import { GlobalValue } from "./tsadv$GlobalValue";
export class GlobalValueGroup extends AbstractGroup {
  static NAME = "tsadv$GlobalValueGroup";
  list?: GlobalValue[] | null;
  globalValue?: GlobalValue | null;
}
export type GlobalValueGroupViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "globalValueGroup.view";
export type GlobalValueGroupView<
  V extends GlobalValueGroupViewName
> = V extends "_base"
  ? Pick<
      GlobalValueGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      GlobalValueGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "globalValueGroup.view"
  ? Pick<
      GlobalValueGroup,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "globalValue"
    >
  : never;
