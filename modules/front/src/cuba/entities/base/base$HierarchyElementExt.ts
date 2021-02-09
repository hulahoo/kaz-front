import { HierarchyElement } from "./base$HierarchyElement";
import { PositionGroupExt } from "./base$PositionGroupExt";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { HierarchyElementGroup } from "./tsadv_HierarchyElementGroup";
export class HierarchyElementExt extends HierarchyElement {
  static NAME = "base$HierarchyElementExt";
  positionGroup?: PositionGroupExt | null;
  organizationGroup?: OrganizationGroupExt | null;
  personGroup?: PersonGroupExt | null;
  parent?: HierarchyElementExt | null;
  parentGroup?: HierarchyElementGroup | null;
  parentFromGroup?: HierarchyElementExt | null;
  group?: HierarchyElementGroup | null;
  hasChild?: boolean | null;
  name?: string | null;
}
export type HierarchyElementExtViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "hierarchyElement-with-assignments"
  | "hierarchyElement.browse"
  | "hierarchyElement.edit"
  | "hierarchyElement.full"
  | "hierarchyElement.lookup"
  | "hierarchyElement.parent"
  | "hierarchyElement.parent.minimal"
  | "hierarchyElement.position.tree"
  | "hierarchyElement.timecard"
  | "hierarchyElementExt-for-integration-rest"
  | "new.hierarchyElement.browse";
export type HierarchyElementExtView<
  V extends HierarchyElementExtViewName
> = V extends "_base"
  ? Pick<
      HierarchyElementExt,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
      | "elementType"
    >
  : V extends "_local"
  ? Pick<
      HierarchyElementExt,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
      | "elementType"
    >
  : V extends "_minimal"
  ? Pick<HierarchyElementExt, "id">
  : V extends "hierarchyElement-with-assignments"
  ? Pick<
      HierarchyElementExt,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
      | "elementType"
      | "positionGroup"
      | "organizationGroup"
      | "parent"
      | "name"
    >
  : V extends "hierarchyElement.browse"
  ? Pick<
      HierarchyElementExt,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
      | "elementType"
      | "positionGroup"
      | "organizationGroup"
      | "parent"
      | "hierarchy"
    >
  : V extends "hierarchyElement.edit"
  ? Pick<
      HierarchyElementExt,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
      | "elementType"
      | "positionGroup"
      | "organizationGroup"
      | "parent"
      | "hierarchy"
    >
  : V extends "hierarchyElement.full"
  ? Pick<
      HierarchyElementExt,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
      | "elementType"
      | "positionGroup"
      | "organizationGroup"
      | "parent"
      | "hierarchy"
      | "name"
    >
  : V extends "hierarchyElement.lookup"
  ? Pick<
      HierarchyElementExt,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
      | "elementType"
      | "positionGroup"
      | "organizationGroup"
      | "parent"
      | "hierarchy"
    >
  : V extends "hierarchyElement.parent"
  ? Pick<
      HierarchyElementExt,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
      | "elementType"
      | "parent"
      | "hierarchy"
      | "positionGroup"
      | "organizationGroup"
    >
  : V extends "hierarchyElement.parent.minimal"
  ? Pick<
      HierarchyElementExt,
      | "id"
      | "parent"
      | "legacyId"
      | "positionGroup"
      | "organizationGroup"
      | "elementType"
    >
  : V extends "hierarchyElement.position.tree"
  ? Pick<
      HierarchyElementExt,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
      | "elementType"
      | "positionGroup"
      | "parent"
    >
  : V extends "hierarchyElement.timecard"
  ? Pick<
      HierarchyElementExt,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
      | "elementType"
      | "positionGroup"
      | "organizationGroup"
      | "parent"
      | "name"
    >
  : V extends "hierarchyElementExt-for-integration-rest"
  ? Pick<
      HierarchyElementExt,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
      | "elementType"
      | "positionGroup"
      | "organizationGroup"
      | "parentGroup"
      | "group"
      | "hierarchy"
    >
  : V extends "new.hierarchyElement.browse"
  ? Pick<
      HierarchyElementExt,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
      | "elementType"
      | "group"
      | "parentGroup"
      | "organizationGroup"
      | "positionGroup"
    >
  : never;
