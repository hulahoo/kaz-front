import { StandardEntity } from "./sys$StandardEntity";
import { Hierarchy } from "./base$Hierarchy";
import { HierarchyElementExt } from "./base$HierarchyElementExt";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
export class OrganizationStructure extends StandardEntity {
  static NAME = "tsadv$OrganizationStructure";
  hierarchy?: Hierarchy | null;
  parent?: HierarchyElementExt | null;
  elementType?: number | null;
  organizationGroup?: OrganizationGroupExt | null;
  parentOrganizationGroup?: OrganizationGroupExt | null;
  pathOrgName1?: string | null;
  pathOrgName2?: string | null;
  pathOrgName3?: string | null;
  startDate?: any | null;
  endDate?: any | null;
  path?: string | null;
  level?: number | null;
}
export type OrganizationStructureViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "organizationStructure.for.requisition"
  | "organizationStructure.for.orgService";
export type OrganizationStructureView<
  V extends OrganizationStructureViewName
> = V extends "_local"
  ? Pick<
      OrganizationStructure,
      | "id"
      | "elementType"
      | "pathOrgName1"
      | "pathOrgName2"
      | "pathOrgName3"
      | "startDate"
      | "endDate"
      | "path"
      | "level"
    >
  : V extends "_base"
  ? Pick<
      OrganizationStructure,
      | "id"
      | "elementType"
      | "pathOrgName1"
      | "pathOrgName2"
      | "pathOrgName3"
      | "startDate"
      | "endDate"
      | "path"
      | "level"
    >
  : V extends "organizationStructure.for.requisition"
  ? Pick<
      OrganizationStructure,
      | "id"
      | "elementType"
      | "pathOrgName1"
      | "pathOrgName2"
      | "pathOrgName3"
      | "startDate"
      | "endDate"
      | "path"
      | "level"
      | "organizationGroup"
      | "parentOrganizationGroup"
    >
  : V extends "organizationStructure.for.orgService"
  ? Pick<
      OrganizationStructure,
      "id" | "organizationGroup" | "pathOrgName1" | "startDate" | "endDate"
    >
  : never;
