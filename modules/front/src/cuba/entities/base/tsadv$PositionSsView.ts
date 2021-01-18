import { StandardEntity } from "./sys$StandardEntity";
import { PositionGroupExt } from "./base$PositionGroupExt";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { GradeGroup } from "./tsadv$GradeGroup";
export class PositionSsView extends StandardEntity {
  static NAME = "tsadv$PositionSsView";
  positionNameRu?: string | null;
  positionNameKz?: string | null;
  positionNameEn?: string | null;
  positionName?: string | null;
  startDate?: any | null;
  endDate?: any | null;
  maxStartDate?: string | null;
  positionGroup?: PositionGroupExt | null;
  organizationGroup?: OrganizationGroupExt | null;
  gradeGroup?: GradeGroup | null;
  fte?: any | null;
  costCenter?: string | null;
}
export type PositionSsViewViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "positionSsView-view";
export type PositionSsViewView<
  V extends PositionSsViewViewName
> = V extends "_base"
  ? Pick<
      PositionSsView,
      | "id"
      | "positionNameRu"
      | "positionNameKz"
      | "positionNameEn"
      | "startDate"
      | "endDate"
      | "maxStartDate"
      | "fte"
      | "costCenter"
    >
  : V extends "_local"
  ? Pick<
      PositionSsView,
      | "id"
      | "positionNameRu"
      | "positionNameKz"
      | "positionNameEn"
      | "startDate"
      | "endDate"
      | "maxStartDate"
      | "fte"
      | "costCenter"
    >
  : V extends "positionSsView-view"
  ? Pick<
      PositionSsView,
      | "id"
      | "positionNameRu"
      | "positionNameKz"
      | "positionNameEn"
      | "startDate"
      | "endDate"
      | "maxStartDate"
      | "fte"
      | "costCenter"
      | "positionGroup"
      | "organizationGroup"
      | "gradeGroup"
    >
  : never;
