import { AbstractParentEntity } from "./AbstractParentEntity";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { PositionGroupExt } from "./base$PositionGroupExt";
export class PositionStructure extends AbstractParentEntity {
  static NAME = "tsadv$PositionStructure";
  lvl?: number | null;
  elementType?: any | null;
  organizationGroup?: OrganizationGroupExt | null;
  positionGroup?: PositionGroupExt | null;
  managerFlag?: boolean | null;
  parentOrganizationGroup?: OrganizationGroupExt | null;
  parentPositionGroup?: PositionGroupExt | null;
  positionGroupPath?: string | null;
  organizationGroupPath?: string | null;
  startDate?: any | null;
  endDate?: any | null;
  posStartDate?: any | null;
  posEndDate?: any | null;
}
export type PositionStructureViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "positionStructure.view";
export type PositionStructureView<
  V extends PositionStructureViewName
> = V extends "_base"
  ? Pick<
      PositionStructure,
      | "id"
      | "lvl"
      | "elementType"
      | "managerFlag"
      | "positionGroupPath"
      | "organizationGroupPath"
      | "startDate"
      | "endDate"
      | "posStartDate"
      | "posEndDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PositionStructure,
      | "id"
      | "lvl"
      | "elementType"
      | "managerFlag"
      | "positionGroupPath"
      | "organizationGroupPath"
      | "startDate"
      | "endDate"
      | "posStartDate"
      | "posEndDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "positionStructure.view"
  ? Pick<
      PositionStructure,
      | "id"
      | "lvl"
      | "elementType"
      | "managerFlag"
      | "positionGroupPath"
      | "organizationGroupPath"
      | "startDate"
      | "endDate"
      | "posStartDate"
      | "posEndDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "organizationGroup"
      | "positionGroup"
      | "parentOrganizationGroup"
      | "parentPositionGroup"
    >
  : never;
