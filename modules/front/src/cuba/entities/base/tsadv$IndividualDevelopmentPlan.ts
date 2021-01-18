import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { IdpDetail } from "./tsadv$IdpDetail";
export class IndividualDevelopmentPlan extends AbstractParentEntity {
  static NAME = "tsadv$IndividualDevelopmentPlan";
  personGroup?: PersonGroupExt | null;
  planName?: string | null;
  status?: any | null;
  startDate?: any | null;
  endDate?: any | null;
  idpDetail?: IdpDetail[] | null;
}
export type IndividualDevelopmentPlanViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "individualDevelopmentPlan.edit";
export type IndividualDevelopmentPlanView<
  V extends IndividualDevelopmentPlanViewName
> = V extends "_base"
  ? Pick<
      IndividualDevelopmentPlan,
      | "id"
      | "planName"
      | "status"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      IndividualDevelopmentPlan,
      | "id"
      | "planName"
      | "status"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<IndividualDevelopmentPlan, "id" | "planName">
  : V extends "individualDevelopmentPlan.edit"
  ? Pick<
      IndividualDevelopmentPlan,
      | "id"
      | "planName"
      | "status"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "personGroup"
      | "idpDetail"
    >
  : never;
