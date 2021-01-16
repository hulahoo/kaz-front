import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicIndustry } from "./base$DicIndustry";
import { DicRequestStatus } from "./tsadv$DicRequestStatus";
import { FileDescriptor } from "./sys$FileDescriptor";
export class PersonExperienceRequest extends AbstractParentEntity {
  static NAME = "tsadv_PersonExperienceRequest";
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
  requestStatus?: DicRequestStatus | null;
  attachments?: FileDescriptor[] | null;
}
export type PersonExperienceRequestViewName = "_base" | "_local" | "_minimal";
export type PersonExperienceRequestView<
  V extends PersonExperienceRequestViewName
> = V extends "_base"
  ? Pick<
      PersonExperienceRequest,
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
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PersonExperienceRequest,
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
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
