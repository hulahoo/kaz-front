import { AbstractParentEntity } from "./AbstractParentEntity";
import { IndividualDevelopmentPlan } from "./tsadv$IndividualDevelopmentPlan";
import { CompetenceGroup } from "./tsadv$CompetenceGroup";
import { ScaleLevel } from "./tsadv$ScaleLevel";
import { Course } from "./tsadv$Course";
import { DicEducationType } from "./tsadv$DicEducationType";
export class IdpDetail extends AbstractParentEntity {
  static NAME = "tsadv$IdpDetail";
  idp?: IndividualDevelopmentPlan | null;
  competence?: CompetenceGroup | null;
  scaleLevel?: ScaleLevel | null;
  course?: Course | null;
  educationType?: DicEducationType | null;
  description?: string | null;
  targetDate?: any | null;
  done?: boolean | null;
  comment?: string | null;
  reason?: string | null;
}
export type IdpDetailViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "idpDetail.edit";
export type IdpDetailView<V extends IdpDetailViewName> = V extends "_base"
  ? Pick<
      IdpDetail,
      | "id"
      | "description"
      | "targetDate"
      | "done"
      | "comment"
      | "reason"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      IdpDetail,
      | "id"
      | "description"
      | "targetDate"
      | "done"
      | "comment"
      | "reason"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "idpDetail.edit"
  ? Pick<
      IdpDetail,
      | "id"
      | "description"
      | "targetDate"
      | "done"
      | "comment"
      | "reason"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "competence"
      | "scaleLevel"
      | "course"
      | "educationType"
    >
  : never;
