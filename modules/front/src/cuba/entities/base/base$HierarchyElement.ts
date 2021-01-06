import { AbstractTimeBasedEntity } from "./AbstractTimeBasedEntity";
import { Hierarchy } from "./base$Hierarchy";
export class HierarchyElement extends AbstractTimeBasedEntity {
  static NAME = "base$HierarchyElement";
  elementType?: any | null;
  hierarchy?: Hierarchy | null;
  parentName?: string | null;
}
export type HierarchyElementViewName = "_base" | "_local" | "_minimal";
export type HierarchyElementView<
  V extends HierarchyElementViewName
> = V extends "_base"
  ? Pick<
      HierarchyElement,
      | "id"
      | "elementType"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : V extends "_local"
  ? Pick<
      HierarchyElement,
      | "id"
      | "elementType"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : V extends "_minimal"
  ? Pick<HierarchyElement, "id">
  : never;
