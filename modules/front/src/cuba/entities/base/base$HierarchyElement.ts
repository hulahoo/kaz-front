import { AbstractParentEntity } from "./AbstractParentEntity";
import { Hierarchy } from "./base$Hierarchy";
export class HierarchyElement extends AbstractParentEntity {
  static NAME = "base$HierarchyElement";
  elementType?: any | null;
  hierarchy?: Hierarchy | null;
  startDate?: any | null;
  endDate?: any | null;
  parentName?: string | null;
  doNotCopy?: boolean | null;
}
export type HierarchyElementViewName = "_minimal" | "_local" | "_base";
export type HierarchyElementView<
  V extends HierarchyElementViewName
> = V extends "_minimal"
  ? Pick<HierarchyElement, "id">
  : V extends "_local"
  ? Pick<
      HierarchyElement,
      | "id"
      | "elementType"
      | "startDate"
      | "endDate"
      | "doNotCopy"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      HierarchyElement,
      | "id"
      | "elementType"
      | "startDate"
      | "endDate"
      | "doNotCopy"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
