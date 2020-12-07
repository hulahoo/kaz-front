import { StandardEntity } from "./sys$StandardEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
export class PersonMentor extends StandardEntity {
  static NAME = "tsadv$PersonMentor";
  personGroup?: PersonGroupExt | null;
  mentor?: PersonGroupExt | null;
  startDate?: any | null;
  endDate?: any | null;
  organizationGroup?: OrganizationGroupExt | null;
}
export type PersonMentorViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "personMentor.edit";
export type PersonMentorView<
  V extends PersonMentorViewName
> = V extends "_local"
  ? Pick<PersonMentor, "id" | "startDate" | "endDate">
  : V extends "_base"
  ? Pick<PersonMentor, "id" | "startDate" | "endDate">
  : V extends "personMentor.edit"
  ? Pick<
      PersonMentor,
      | "id"
      | "startDate"
      | "endDate"
      | "personGroup"
      | "mentor"
      | "organizationGroup"
    >
  : never;
