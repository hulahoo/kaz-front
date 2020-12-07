import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonExt } from "./base$PersonExt";
import { IncidentWitnesses } from "./tsadv$IncidentWitnesses";
import { Attachment } from "./tsadv$Attachment";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { IncidentType } from "./tsadv$IncidentType";
import { WorkPlace } from "./tsadv$WorkPlace";
export class Incident extends AbstractParentEntity {
  static NAME = "tsadv$Incident";
  managerPerson?: PersonExt | null;
  witnesses?: IncidentWitnesses[] | null;
  attachment?: Attachment[] | null;
  organization?: OrganizationGroupExt | null;
  incidentType?: IncidentType | null;
  incidentDate?: any | null;
  incidentTime?: any | null;
  startShift?: any | null;
  endShift?: any | null;
  incidentConditions?: string | null;
  incidentReason?: string | null;
  damage?: string | null;
  correctiveActions?: string | null;
  stoppedProcess?: boolean | null;
  workPlace?: WorkPlace | null;
}
export type IncidentViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "incident-view";
export type IncidentView<V extends IncidentViewName> = V extends "_local"
  ? Pick<
      Incident,
      | "id"
      | "incidentDate"
      | "incidentTime"
      | "startShift"
      | "endShift"
      | "incidentConditions"
      | "incidentReason"
      | "damage"
      | "correctiveActions"
      | "stoppedProcess"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      Incident,
      | "id"
      | "incidentDate"
      | "incidentTime"
      | "startShift"
      | "endShift"
      | "incidentConditions"
      | "incidentReason"
      | "damage"
      | "correctiveActions"
      | "stoppedProcess"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "incident-view"
  ? Pick<
      Incident,
      | "id"
      | "managerPerson"
      | "organization"
      | "incidentType"
      | "incidentDate"
      | "incidentTime"
      | "startShift"
      | "endShift"
      | "incidentConditions"
      | "incidentReason"
      | "damage"
      | "correctiveActions"
      | "stoppedProcess"
      | "witnesses"
      | "attachment"
      | "workPlace"
    >
  : never;
