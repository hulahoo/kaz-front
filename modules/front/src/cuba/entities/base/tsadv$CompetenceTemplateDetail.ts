import { AbstractParentEntity } from "./AbstractParentEntity";
import { CompetenceTemplate } from "./tsadv$CompetenceTemplate";
import { CompetenceGroup } from "./tsadv$CompetenceGroup";
export class CompetenceTemplateDetail extends AbstractParentEntity {
  static NAME = "tsadv$CompetenceTemplateDetail";
  competenceTemplate?: CompetenceTemplate | null;
  competenceGroup?: CompetenceGroup | null;
  weight?: number | null;
}
export type CompetenceTemplateDetailViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "competenceTemplateDetail-view";
export type CompetenceTemplateDetailView<
  V extends CompetenceTemplateDetailViewName
> = V extends "_minimal"
  ? Pick<CompetenceTemplateDetail, "id" | "competenceGroup">
  : V extends "_local"
  ? Pick<
      CompetenceTemplateDetail,
      "id" | "weight" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      CompetenceTemplateDetail,
      | "id"
      | "competenceGroup"
      | "weight"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "competenceTemplateDetail-view"
  ? Pick<
      CompetenceTemplateDetail,
      | "id"
      | "weight"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "competenceGroup"
    >
  : never;
