import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class PositionHierarchy extends BaseUuidEntity {
  static NAME = "tsadv_PositionHierarchy";
  positionName?: string | null;
  haveChildren?: boolean | null;
  children?: PositionHierarchy[] | null;
  parent?: PositionHierarchy | null;
}
export type PositionHierarchyViewName = "_base" | "_local" | "_minimal";
export type PositionHierarchyView<V extends PositionHierarchyViewName> = never;
