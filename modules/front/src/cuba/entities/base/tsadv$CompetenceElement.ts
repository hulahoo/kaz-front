import { AbstractParentEntity } from "./AbstractParentEntity";
import { CompetenceGroup } from "./tsadv$CompetenceGroup";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { PositionGroupExt } from "./base$PositionGroupExt";
import { ScaleLevel } from "./tsadv$ScaleLevel";
import { JobGroup } from "./tsadv$JobGroup";
export class CompetenceElement extends AbstractParentEntity {
  static NAME = "tsadv$CompetenceElement";
  competenceGroup?: CompetenceGroup | null;
  objectId?: any | null;
  objectTypeId?: any | null;
  personGroup?: PersonGroupExt | null;
  organizationGroup?: OrganizationGroupExt | null;
  positionGroup?: PositionGroupExt | null;
  scaleLevel?: ScaleLevel | null;
  jobGroup?: JobGroup | null;
}
export type CompetenceElementViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "competenceElement-view"
  | "competenceElement.card"
  | "competenceElement.for.language"
  | "competenceElement.full";
export type CompetenceElementView<
  V extends CompetenceElementViewName
> = V extends "_base"
  ? Pick<
      CompetenceElement,
      | "id"
      | "competenceGroup"
      | "objectId"
      | "objectTypeId"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      CompetenceElement,
      | "id"
      | "objectId"
      | "objectTypeId"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<
      CompetenceElement,
      "id" | "competenceGroup" | "objectId" | "objectTypeId"
    >
  : V extends "competenceElement-view"
  ? Pick<CompetenceElement, "id" | "competenceGroup" | "scaleLevel">
  : V extends "competenceElement.card"
  ? Pick<
      CompetenceElement,
      | "id"
      | "competenceGroup"
      | "objectId"
      | "objectTypeId"
      | "scaleLevel"
      | "competenceGroup"
    >
  : V extends "competenceElement.for.language"
  ? Pick<
      CompetenceElement,
      | "id"
      | "objectId"
      | "objectTypeId"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "competenceGroup"
      | "scaleLevel"
    >
  : V extends "competenceElement.full"
  ? Pick<
      CompetenceElement,
      | "id"
      | "objectId"
      | "objectTypeId"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "competenceGroup"
      | "personGroup"
      | "organizationGroup"
      | "positionGroup"
      | "scaleLevel"
    >
  : never;
