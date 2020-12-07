import { AbstractParentEntity } from "./AbstractParentEntity";
import { Requisition } from "./tsadv$Requisition";
import { CompetenceGroup } from "./tsadv$CompetenceGroup";
import { ScaleLevel } from "./tsadv$ScaleLevel";
export class RequisitionCompetence extends AbstractParentEntity {
  static NAME = "tsadv$RequisitionCompetence";
  requisition?: Requisition | null;
  competenceGroup?: CompetenceGroup | null;
  scaleLevel?: ScaleLevel | null;
  criticalness?: any | null;
}
export type RequisitionCompetenceViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "requisitionCompetence.view";
export type RequisitionCompetenceView<
  V extends RequisitionCompetenceViewName
> = V extends "_minimal"
  ? Pick<RequisitionCompetence, "id">
  : V extends "_local"
  ? Pick<
      RequisitionCompetence,
      | "id"
      | "criticalness"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      RequisitionCompetence,
      | "id"
      | "criticalness"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "requisitionCompetence.view"
  ? Pick<
      RequisitionCompetence,
      | "id"
      | "criticalness"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requisition"
      | "competenceGroup"
      | "scaleLevel"
    >
  : never;
