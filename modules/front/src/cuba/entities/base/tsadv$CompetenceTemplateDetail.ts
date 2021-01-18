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
  | "_base"
  | "_local"
  | "_minimal"
  | "competenceTemplateDetail-view";
export type CompetenceTemplateDetailView<
  V extends CompetenceTemplateDetailViewName
> = V extends "_base"
  ? Pick<
      CompetenceTemplateDetail,
      | "id"
      | "competenceGroup"
      | "weight"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      CompetenceTemplateDetail,
      "id" | "weight" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<CompetenceTemplateDetail, "id" | "competenceGroup">
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
