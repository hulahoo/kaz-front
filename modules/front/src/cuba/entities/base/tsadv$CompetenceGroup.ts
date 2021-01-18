import { AbstractGroup } from "./AbstractGroup";
import { Competence } from "./tsadv$Competence";
export class CompetenceGroup extends AbstractGroup {
  static NAME = "tsadv$CompetenceGroup";
  list?: Competence[] | null;
  competence?: Competence | null;
}
export type CompetenceGroupViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "competenceGroup.browse"
  | "competenceGroup.reserve";
export type CompetenceGroupView<
  V extends CompetenceGroupViewName
> = V extends "_base"
  ? Pick<
      CompetenceGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      CompetenceGroup,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<CompetenceGroup, "id">
  : V extends "competenceGroup.browse"
  ? Pick<
      CompetenceGroup,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "competence"
    >
  : V extends "competenceGroup.reserve"
  ? Pick<CompetenceGroup, "id" | "list" | "competence">
  : never;
