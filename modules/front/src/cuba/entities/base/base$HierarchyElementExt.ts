import { HierarchyElement } from "./base$HierarchyElement";
import { PositionGroupExt } from "./base$PositionGroupExt";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class HierarchyElementExt extends HierarchyElement {
  static NAME = "base$HierarchyElementExt";
  positionGroup?: PositionGroupExt | null;
  organizationGroup?: OrganizationGroupExt | null;
  personGroup?: PersonGroupExt | null;
  parent?: HierarchyElementExt | null;
  name?: string | null;
}
export type HierarchyElementExtViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "hierarchyElement.full"
  | "hierarchyElement.timecard"
  | "hierarchyElement.browse"
  | "hierarchyElement.lookup"
  | "hierarchyElement.edit"
  | "hierarchyElement.parent"
  | "hierarchyElement-with-assignments"
  | "hierarchyElement.position.tree"
  | "hierarchyElement.parent.minimal";
export type HierarchyElementExtView<
  V extends HierarchyElementExtViewName
> = V extends "_minimal"
  ? Pick<HierarchyElementExt, "id">
  : V extends "_local"
  ? Pick<
      HierarchyElementExt,
      | "id"
      | "name"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "elementType"
      | "startDate"
      | "endDate"
      | "doNotCopy"
    >
  : V extends "_base"
  ? Pick<
      HierarchyElementExt,
      | "id"
      | "name"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "elementType"
      | "startDate"
      | "endDate"
      | "doNotCopy"
    >
  : V extends "hierarchyElement.full"
  ? Pick<
      HierarchyElementExt,
      | "id"
      | "name"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "elementType"
      | "startDate"
      | "endDate"
      | "doNotCopy"
      | "positionGroup"
      | "organizationGroup"
      | "parent"
      | "hierarchy"
      | "name"
    >
  : V extends "hierarchyElement.timecard"
  ? Pick<
      HierarchyElementExt,
      | "id"
      | "name"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "elementType"
      | "startDate"
      | "endDate"
      | "doNotCopy"
      | "positionGroup"
      | "organizationGroup"
      | "parent"
      | "name"
    >
  : V extends "hierarchyElement.browse"
  ? Pick<
      HierarchyElementExt,
      | "id"
      | "name"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "elementType"
      | "startDate"
      | "endDate"
      | "doNotCopy"
      | "name"
      | "organizationGroup"
      | "positionGroup"
      | "parent"
      | "hierarchy"
    >
  : V extends "hierarchyElement.lookup"
  ? Pick<
      HierarchyElementExt,
      | "id"
      | "name"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "elementType"
      | "startDate"
      | "endDate"
      | "doNotCopy"
      | "positionGroup"
      | "organizationGroup"
      | "parent"
      | "hierarchy"
    >
  : V extends "hierarchyElement.edit"
  ? Pick<
      HierarchyElementExt,
      | "id"
      | "name"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "elementType"
      | "startDate"
      | "endDate"
      | "doNotCopy"
      | "positionGroup"
      | "organizationGroup"
      | "parent"
      | "hierarchy"
    >
  : V extends "hierarchyElement.parent"
  ? Pick<
      HierarchyElementExt,
      | "id"
      | "name"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "elementType"
      | "startDate"
      | "endDate"
      | "doNotCopy"
      | "parent"
      | "hierarchy"
      | "positionGroup"
      | "organizationGroup"
    >
  : V extends "hierarchyElement-with-assignments"
  ? Pick<
      HierarchyElementExt,
      | "id"
      | "name"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "elementType"
      | "startDate"
      | "endDate"
      | "doNotCopy"
      | "positionGroup"
      | "organizationGroup"
      | "parent"
      | "name"
    >
  : V extends "hierarchyElement.position.tree"
  ? Pick<
      HierarchyElementExt,
      | "id"
      | "name"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "elementType"
      | "startDate"
      | "endDate"
      | "doNotCopy"
      | "positionGroup"
      | "parent"
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
  : never;
