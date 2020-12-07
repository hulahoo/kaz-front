import { AbstractEntityInt } from "./tsadv$AbstractEntityInt";
export class PersonEducationInt extends AbstractEntityInt {
  static NAME = "tsadv$PersonEducationInt";
  school?: string | null;
  startYear?: number | null;
  endYear?: number | null;
  specialization?: string | null;
  level?: any | null;
  levelName?: string | null;
  degree?: any | null;
  degreeName?: string | null;
  location?: string | null;
  bolashak?: boolean | null;
}
export type PersonEducationIntViewName = "_minimal" | "_local" | "_base";
export type PersonEducationIntView<
  V extends PersonEducationIntViewName
> = V extends "_minimal"
  ? Pick<PersonEducationInt, "id">
  : V extends "_base"
  ? Pick<PersonEducationInt, "id">
  : never;
