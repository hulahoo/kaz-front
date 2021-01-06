import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicHierarchyType } from "./base$DicHierarchyType";
export class Hierarchy extends AbstractParentEntity {
  static NAME = "base$Hierarchy";
  hierarchyName?: string | null;
  primaryFlag?: boolean | null;
  type?: DicHierarchyType | null;
}
export type HierarchyViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "hierarchy.view";
export type HierarchyView<V extends HierarchyViewName> = V extends "_base"
  ? Pick<
      Hierarchy,
      | "id"
      | "hierarchyName"
      | "primaryFlag"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Hierarchy,
      | "id"
      | "hierarchyName"
      | "primaryFlag"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<Hierarchy, "id" | "hierarchyName">
  : V extends "hierarchy.view"
  ? Pick<
      Hierarchy,
      | "id"
      | "hierarchyName"
      | "primaryFlag"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "type"
    >
  : never;
