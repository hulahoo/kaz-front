import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonExt } from "./base$PersonExt";
import { Incident } from "./tsadv$Incident";
export class IncidentWitnesses extends AbstractParentEntity {
  static NAME = "tsadv$IncidentWitnesses";
  person?: PersonExt | null;
  incident?: Incident | null;
}
export type IncidentWitnessesViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "incidentWitnesses-view";
export type IncidentWitnessesView<
  V extends IncidentWitnessesViewName
> = V extends "_local"
  ? Pick<
      IncidentWitnesses,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      IncidentWitnesses,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "incidentWitnesses-view"
  ? Pick<IncidentWitnesses, "id" | "person">
  : never;
