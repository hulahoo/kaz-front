import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class PersonClinicDispancer extends AbstractParentEntity {
  static NAME = "tsadv_PersonClinicDispancer";
  personGroup?: PersonGroupExt | null;
  startDateHistory?: any | null;
  endDateHistory?: any | null;
  haveClinicDispancer?: any | null;
  periodFrom?: string | null;
}
export type PersonClinicDispancerViewName = "_base" | "_local" | "_minimal";
export type PersonClinicDispancerView<
  V extends PersonClinicDispancerViewName
> = V extends "_base"
  ? Pick<
      PersonClinicDispancer,
      | "id"
      | "startDateHistory"
      | "endDateHistory"
      | "haveClinicDispancer"
      | "periodFrom"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PersonClinicDispancer,
      | "id"
      | "startDateHistory"
      | "endDateHistory"
      | "haveClinicDispancer"
      | "periodFrom"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
