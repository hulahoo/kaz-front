import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicRequestStatus } from "./tsadv$DicRequestStatus";
export class PersonAdwardRequest extends AbstractParentEntity {
  static NAME = "tsadv_PersonAdwardRequest";
  personGroup?: PersonGroupExt | null;
  requestStatus?: DicRequestStatus | null;
  academicDegree?: string | null;
  scientificWorksIventions?: string | null;
  stateAwards?: string | null;
}
export type PersonAdwardRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "personAdwardRequest-edit";
export type PersonAdwardRequestView<
  V extends PersonAdwardRequestViewName
> = V extends "_base"
  ? Pick<
      PersonAdwardRequest,
      | "id"
      | "academicDegree"
      | "scientificWorksIventions"
      | "stateAwards"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PersonAdwardRequest,
      | "id"
      | "academicDegree"
      | "scientificWorksIventions"
      | "stateAwards"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "personAdwardRequest-edit"
  ? Pick<
      PersonAdwardRequest,
      | "id"
      | "academicDegree"
      | "scientificWorksIventions"
      | "stateAwards"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "personGroup"
      | "requestStatus"
    >
  : never;
