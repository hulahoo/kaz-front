import { StandardEntity } from "./sys$StandardEntity";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
export class OrganizationSsView extends StandardEntity {
  static NAME = "tsadv$OrganizationSsView";
  startDate?: any | null;
  endDate?: any | null;
  maxStartDate?: string | null;
  organizationGroup?: OrganizationGroupExt | null;
  organizationNameRu?: string | null;
  organizationNameKz?: string | null;
  organizationNameEn?: string | null;
  organizationName?: string | null;
  costCenter?: string | null;
}
export type OrganizationSsViewViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "organizationSsView-view";
export type OrganizationSsViewView<
  V extends OrganizationSsViewViewName
> = V extends "_local"
  ? Pick<
      OrganizationSsView,
      | "id"
      | "startDate"
      | "endDate"
      | "maxStartDate"
      | "organizationNameRu"
      | "organizationNameKz"
      | "organizationNameEn"
      | "costCenter"
    >
  : V extends "_base"
  ? Pick<
      OrganizationSsView,
      | "id"
      | "startDate"
      | "endDate"
      | "maxStartDate"
      | "organizationNameRu"
      | "organizationNameKz"
      | "organizationNameEn"
      | "costCenter"
    >
  : V extends "organizationSsView-view"
  ? Pick<
      OrganizationSsView,
      | "id"
      | "startDate"
      | "endDate"
      | "maxStartDate"
      | "organizationNameRu"
      | "organizationNameKz"
      | "organizationNameEn"
      | "costCenter"
      | "organizationGroup"
    >
  : never;
