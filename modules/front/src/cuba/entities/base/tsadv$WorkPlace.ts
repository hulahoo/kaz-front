import { AbstractParentEntity } from "./AbstractParentEntity";
import { WorkPlaceMonitoring } from "./tsadv$WorkPlaceMonitoring";
import { WorkplaceMSDS } from "./tsadv$WorkplaceMSDS";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { JobGroup } from "./tsadv$JobGroup";
export class WorkPlace extends AbstractParentEntity {
  static NAME = "tsadv$WorkPlace";
  name?: string | null;
  monitoring?: WorkPlaceMonitoring[] | null;
  msds?: WorkplaceMSDS[] | null;
  organization?: OrganizationGroupExt | null;
  job?: JobGroup | null;
}
export type WorkPlaceViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "workPlace-view";
export type WorkPlaceView<V extends WorkPlaceViewName> = V extends "_base"
  ? Pick<
      WorkPlace,
      "id" | "name" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      WorkPlace,
      "id" | "name" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<WorkPlace, "id" | "name">
  : V extends "workPlace-view"
  ? Pick<
      WorkPlace,
      "id" | "name" | "organization" | "job" | "monitoring" | "msds"
    >
  : never;
