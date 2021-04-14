import { AbstractGroup } from "./AbstractGroup";
import { HierarchyElementExt } from "./base$HierarchyElementExt";
export class HierarchyElementGroup extends AbstractGroup {
  static NAME = "tsadv_HierarchyElementGroup";
  list?: HierarchyElementExt[] | null;
  hierarchyElement?: HierarchyElementExt | null;
  name?: string | null;
}
export type HierarchyElementGroupViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "hierarchyElementGroup-for-integration-rest"
  | "new.hierarchyElement.browse";
export type HierarchyElementGroupView<
  V extends HierarchyElementGroupViewName
> = V extends "_base"
  ? Pick<
      HierarchyElementGroup,
      | "id"
      | "name"
      | "list"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      HierarchyElementGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<HierarchyElementGroup, "id" | "name" | "list">
  : V extends "hierarchyElementGroup-for-integration-rest"
  ? Pick<
      HierarchyElementGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin" | "list"
    >
  : V extends "new.hierarchyElement.browse"
  ? Pick<
      HierarchyElementGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin" | "list"
    >
  : never;
