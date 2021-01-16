import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicRequestStatus } from "./tsadv$DicRequestStatus";
import { FileDescriptor } from "./sys$FileDescriptor";
import { PersonClinicDispancer } from "./tsadv_PersonClinicDispancer";
export class PersonClinicDispancerRequest extends AbstractParentEntity {
  static NAME = "tsadv_PersonClinicDispancerRequest";
  personGroup?: PersonGroupExt | null;
  requestStatus?: DicRequestStatus | null;
  file?: FileDescriptor | null;
  personClinicDispancer?: PersonClinicDispancer | null;
  haveClinicDispancer?: any | null;
  periodFrom?: string | null;
}
export type PersonClinicDispancerRequestViewName =
  | "_base"
  | "_local"
  | "_minimal";
export type PersonClinicDispancerRequestView<
  V extends PersonClinicDispancerRequestViewName
> = V extends "_base"
  ? Pick<
      PersonClinicDispancerRequest,
      | "id"
      | "haveClinicDispancer"
      | "periodFrom"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PersonClinicDispancerRequest,
      | "id"
      | "haveClinicDispancer"
      | "periodFrom"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
