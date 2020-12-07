import { AbstractEntityInt } from "./tsadv$AbstractEntityInt";
export class PersonExperienceInt extends AbstractEntityInt {
  static NAME = "tsadv$PersonExperienceInt";
  company?: string | null;
  untilNow?: boolean | null;
  job?: string | null;
  startMonth?: string | null;
  endMonth?: string | null;
  description?: string | null;
}
export type PersonExperienceIntViewName = "_minimal" | "_local" | "_base";
export type PersonExperienceIntView<
  V extends PersonExperienceIntViewName
> = V extends "_minimal"
  ? Pick<PersonExperienceInt, "id">
  : V extends "_base"
  ? Pick<PersonExperienceInt, "id">
  : never;
