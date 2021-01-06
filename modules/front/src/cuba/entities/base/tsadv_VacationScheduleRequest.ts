import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { AbsenceRequestStatus } from "./tsadv_AbsenceRequestStatus";
export class VacationScheduleRequest extends AbstractParentEntity {
  static NAME = "tsadv_VacationScheduleRequest";
  requestNumber?: any | null;
  requestDate?: any | null;
  personGroup?: PersonGroupExt | null;
  status?: AbsenceRequestStatus | null;
  startDate?: any | null;
  endDate?: any | null;
  absenceDays?: number | null;
}
export type VacationScheduleRequestViewName = "_base" | "_local" | "_minimal";
export type VacationScheduleRequestView<
  V extends VacationScheduleRequestViewName
> = V extends "_base"
  ? Pick<
      VacationScheduleRequest,
      | "id"
      | "requestNumber"
      | "requestDate"
      | "startDate"
      | "endDate"
      | "absenceDays"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      VacationScheduleRequest,
      | "id"
      | "requestNumber"
      | "requestDate"
      | "startDate"
      | "endDate"
      | "absenceDays"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
