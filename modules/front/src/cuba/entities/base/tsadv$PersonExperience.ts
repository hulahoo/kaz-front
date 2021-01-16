import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicIndustry } from "./base$DicIndustry";
import { FileDescriptor } from "./sys$FileDescriptor";
export class PersonExperience extends AbstractParentEntity {
  static NAME = "tsadv$PersonExperience";
  personGroup?: PersonGroupExt | null;
  untilNow?: boolean | null;
  company?: string | null;
  job?: string | null;
  startMonth?: any | null;
  endMonth?: any | null;
  description?: string | null;
  location?: string | null;
  partTime?: boolean | null;
  miningExperience?: boolean | null;
  groupExperience?: boolean | null;
  industry?: DicIndustry | null;
  years?: number | null;
  months?: number | null;
  days?: number | null;
  startDateHistory?: any | null;
  endDateHistory?: any | null;
  attachments?: FileDescriptor[] | null;
}
export type PersonExperienceViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "personExperience.full"
  | "personExperience.view";
export type PersonExperienceView<
  V extends PersonExperienceViewName
> = V extends "_base"
  ? Pick<
      PersonExperience,
      | "id"
      | "company"
      | "startMonth"
      | "endMonth"
      | "untilNow"
      | "job"
      | "description"
      | "location"
      | "partTime"
      | "miningExperience"
      | "groupExperience"
      | "years"
      | "months"
      | "days"
      | "startDateHistory"
      | "endDateHistory"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
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
      | "location"
      | "partTime"
      | "miningExperience"
      | "groupExperience"
      | "years"
      | "months"
      | "days"
      | "startDateHistory"
      | "endDateHistory"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<PersonExperience, "id" | "company" | "startMonth" | "endMonth">
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
      | "location"
      | "partTime"
      | "miningExperience"
      | "groupExperience"
      | "years"
      | "months"
      | "days"
      | "startDateHistory"
      | "endDateHistory"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "personGroup"
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
      | "location"
      | "partTime"
      | "miningExperience"
      | "groupExperience"
      | "years"
      | "months"
      | "days"
      | "startDateHistory"
      | "endDateHistory"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "personGroup"
    >
  : never;
