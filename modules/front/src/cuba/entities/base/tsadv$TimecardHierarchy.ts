import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { PositionGroupExt } from "./base$PositionGroupExt";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class TimecardHierarchy extends BaseUuidEntity {
  static NAME = "tsadv$TimecardHierarchy";
  parent?: TimecardHierarchy | null;
  organizationGroup?: OrganizationGroupExt | null;
  positionGroup?: PositionGroupExt | null;
  elementType?: any | null;
  idPath?: string | null;
  startDate?: any | null;
  endDate?: any | null;
  level?: number | null;
  personGroup?: PersonGroupExt | null;
  hasChild?: boolean | null;
  name?: string | null;
}
export type TimecardHierarchyViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "timecard-hierarchy"
  | "timecardHierarchy-full-view"
  | "timecardHierarchy-only-parent-view";
export type TimecardHierarchyView<
  V extends TimecardHierarchyViewName
> = V extends "_base"
  ? Pick<
      TimecardHierarchy,
      | "id"
      | "elementType"
      | "idPath"
      | "startDate"
      | "endDate"
      | "level"
      | "name"
    >
  : V extends "_local"
  ? Pick<
      TimecardHierarchy,
      | "id"
      | "elementType"
      | "idPath"
      | "startDate"
      | "endDate"
      | "level"
      | "name"
    >
  : V extends "timecard-hierarchy"
  ? Pick<
      TimecardHierarchy,
      | "id"
      | "elementType"
      | "idPath"
      | "startDate"
      | "endDate"
      | "level"
      | "name"
    >
  : V extends "timecardHierarchy-full-view"
  ? Pick<
      TimecardHierarchy,
      | "id"
      | "elementType"
      | "idPath"
      | "startDate"
      | "endDate"
      | "level"
      | "name"
      | "parent"
      | "organizationGroup"
      | "positionGroup"
    >
  : V extends "timecardHierarchy-only-parent-view"
  ? Pick<TimecardHierarchy, "id" | "parent">
  : never;
