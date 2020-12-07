import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class PersonExperience extends AbstractParentEntity {
  static NAME = "tsadv$PersonExperience";
  personGroup?: PersonGroupExt | null;
  untilNow?: boolean | null;
  company?: string | null;
  job?: string | null;
  startMonth?: any | null;
  endMonth?: any | null;
  description?: string | null;
}
export type PersonExperienceViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "personExperience.view"
  | "personExperience.full";
export type PersonExperienceView<
  V extends PersonExperienceViewName
> = V extends "_minimal"
  ? Pick<PersonExperience, "id" | "company" | "startMonth" | "endMonth">
  : V extends "_local"
  ? Pick<
      PersonExperience,
      | "id"
      | "untilNow"
      | "company"
      | "job"
      | "startMonth"
      | "endMonth"
      | "description"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      PersonExperience,
      | "id"
      | "company"
      | "startMonth"
      | "endMonth"
      | "untilNow"
      | "job"
      | "description"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "personExperience.view"
  ? Pick<
      PersonExperience,
      | "id"
      | "untilNow"
      | "company"
      | "job"
      | "startMonth"
      | "endMonth"
      | "description"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "personGroup"
    >
  : V extends "personExperience.full"
  ? Pick<
      PersonExperience,
      | "id"
      | "untilNow"
      | "company"
      | "job"
      | "startMonth"
      | "endMonth"
      | "description"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "personGroup"
    >
  : never;
