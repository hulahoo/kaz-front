import { AbstractEntityInt } from "./tsadv$AbstractEntityInt";
export class PersonCompetenceInt extends AbstractEntityInt {
  static NAME = "tsadv$PersonCompetenceInt";
  competence?: any | null;
  competenceName?: string | null;
  scaleLevel?: any | null;
  scaleLevelName?: string | null;
  competenceTypeCode?: string | null;
}
export type PersonCompetenceIntViewName = "_minimal" | "_local" | "_base";
export type PersonCompetenceIntView<
  V extends PersonCompetenceIntViewName
> = V extends "_minimal"
  ? Pick<PersonCompetenceInt, "id">
  : V extends "_base"
  ? Pick<PersonCompetenceInt, "id">
  : never;
