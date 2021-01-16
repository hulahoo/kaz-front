import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class PersonReasonChangingJob extends AbstractParentEntity {
  static NAME = "tsadv_PersonReasonChangingJob";
  reason?: string | null;
  telFullNameHR?: string | null;
  personGroup?: PersonGroupExt | null;
}
export type PersonReasonChangingJobViewName = "_base" | "_local" | "_minimal";
export type PersonReasonChangingJobView<
  V extends PersonReasonChangingJobViewName
> = V extends "_base"
  ? Pick<
      PersonReasonChangingJob,
      | "id"
      | "reason"
      | "telFullNameHR"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PersonReasonChangingJob,
      | "id"
      | "reason"
      | "telFullNameHR"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
