import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicCriminalLiabilityType } from "./tsadv_DicCriminalLiabilityType";
import { DicRequestStatus } from "./tsadv$DicRequestStatus";
import { FileDescriptor } from "./sys$FileDescriptor";
import { PersonCriminalAdministrativeLiability } from "./tsadv_PersonCriminalAdministrativeLiability";
export class PersonCriminalAdministrativeLiabilityRequest extends AbstractParentEntity {
  static NAME = "tsadv_PersonCriminalAdministrativeLiabilityRequest";
  personGroup?: PersonGroupExt | null;
  type?: DicCriminalLiabilityType | null;
  haveLiability?: any | null;
  reasonPeriod?: string | null;
  requestStatus?: DicRequestStatus | null;
  file?: FileDescriptor | null;
  liability?: PersonCriminalAdministrativeLiability | null;
}
export type PersonCriminalAdministrativeLiabilityRequestViewName =
  | "_base"
  | "_local"
  | "_minimal";
export type PersonCriminalAdministrativeLiabilityRequestView<
  V extends PersonCriminalAdministrativeLiabilityRequestViewName
> = V extends "_base"
  ? Pick<
      PersonCriminalAdministrativeLiabilityRequest,
      | "id"
      | "haveLiability"
      | "reasonPeriod"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PersonCriminalAdministrativeLiabilityRequest,
      | "id"
      | "haveLiability"
      | "reasonPeriod"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
