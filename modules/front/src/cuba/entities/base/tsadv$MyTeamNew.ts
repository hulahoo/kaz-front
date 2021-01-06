import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class MyTeamNew extends BaseUuidEntity {
  static NAME = "tsadv$MyTeamNew";
  parent?: MyTeamNew | null;
  personGroupId?: any | null;
  positionGroupId?: any | null;
  fullName?: string | null;
  organizationNameLang1?: string | null;
  positionNameLang1?: string | null;
  gradeName?: string | null;
  linkEnabled?: boolean | null;
  hasChild?: boolean | null;
}
export type MyTeamNewViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "myTeamNew-view";
export type MyTeamNewView<V extends MyTeamNewViewName> = V extends "_base"
  ? Pick<MyTeamNew, "id">
  : V extends "_minimal"
  ? Pick<MyTeamNew, "id">
  : V extends "myTeamNew-view"
  ? Pick<MyTeamNew, "id" | "parent">
  : never;
