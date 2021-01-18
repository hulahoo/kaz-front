import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonExt } from "./base$PersonExt";
import { ControlStage } from "./tsadv$ControlStage";
import { WorkPlace } from "./tsadv$WorkPlace";
export class WorkPlaceMonitoring extends AbstractParentEntity {
  static NAME = "tsadv$WorkPlaceMonitoring";
  monitoringDate?: any | null;
  inspectorFullName?: PersonExt | null;
  controlStage?: ControlStage | null;
  workPlace?: WorkPlace | null;
}
export type WorkPlaceMonitoringViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "workPlaceMonitoring-view";
export type WorkPlaceMonitoringView<
  V extends WorkPlaceMonitoringViewName
> = V extends "_base"
  ? Pick<
      WorkPlaceMonitoring,
      | "id"
      | "monitoringDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      WorkPlaceMonitoring,
      | "id"
      | "monitoringDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "workPlaceMonitoring-view"
  ? Pick<
      WorkPlaceMonitoring,
      "id" | "inspectorFullName" | "controlStage" | "monitoringDate"
    >
  : never;
