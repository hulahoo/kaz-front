import { AbstractParentEntity } from "./AbstractParentEntity";
import { CompetenceTemplateDetail } from "./tsadv$CompetenceTemplateDetail";
export class CompetenceTemplate extends AbstractParentEntity {
  static NAME = "tsadv$CompetenceTemplate";
  startDate?: any | null;
  endDate?: any | null;
  usePositionCompetence?: boolean | null;
  positionCompetenceWeight?: number | null;
  competenceTemplateDetail?: CompetenceTemplateDetail[] | null;
  competenceTemplateName?: string | null;
}
export type CompetenceTemplateViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "competenceTemplate-view";
export type CompetenceTemplateView<
  V extends CompetenceTemplateViewName
> = V extends "_minimal"
  ? Pick<CompetenceTemplate, "id" | "competenceTemplateName">
  : V extends "_local"
  ? Pick<
      CompetenceTemplate,
      | "id"
      | "startDate"
      | "endDate"
      | "usePositionCompetence"
      | "positionCompetenceWeight"
      | "competenceTemplateName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      CompetenceTemplate,
      | "id"
      | "competenceTemplateName"
      | "startDate"
      | "endDate"
      | "usePositionCompetence"
      | "positionCompetenceWeight"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "competenceTemplate-view"
  ? Pick<
      CompetenceTemplate,
      | "id"
      | "startDate"
      | "endDate"
      | "usePositionCompetence"
      | "positionCompetenceWeight"
      | "competenceTemplateName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "competenceTemplateDetail"
    >
  : never;
