import { AbstractBprocRequest } from "./AbstractBprocRequest";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicSchedulePurpose } from "./tsadv_DicSchedulePurpose";
import { StandardSchedule } from "./tsadv$StandardSchedule";
export class ScheduleOffsetsRequest extends AbstractBprocRequest {
  static NAME = "tsadv_ScheduleOffsetsRequest";
  static PROCESS_DEFINITION_KEY = "scheduleOffsetsRequest";

  personGroup?: PersonGroupExt | null;
  purpose?: DicSchedulePurpose | null;
  purposeText?: string | null;
  currentSchedule?: StandardSchedule | null;
  newSchedule?: StandardSchedule | null;
  dateOfNewSchedule?: any | null;
  dateOfStartNewSchedule?: any | null;
  detailsOfActualWork?: string | null;
  agree?: boolean | null;
  acquainted?: boolean | null;
}
export type ScheduleOffsetsRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "scheduleOffsetsRequest-for-my-team";
export type ScheduleOffsetsRequestView<
  V extends ScheduleOffsetsRequestViewName
> = V extends "_base"
  ? Pick<
      ScheduleOffsetsRequest,
      | "id"
      | "requestNumber"
      | "requestDate"
      | "purposeText"
      | "dateOfNewSchedule"
      | "dateOfStartNewSchedule"
      | "detailsOfActualWork"
      | "agree"
      | "acquainted"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "comment"
    >
  : V extends "_local"
  ? Pick<
      ScheduleOffsetsRequest,
      | "id"
      | "purposeText"
      | "dateOfNewSchedule"
      | "dateOfStartNewSchedule"
      | "detailsOfActualWork"
      | "agree"
      | "acquainted"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
    >
  : V extends "_minimal"
  ? Pick<ScheduleOffsetsRequest, "id" | "requestNumber" | "requestDate">
  : V extends "scheduleOffsetsRequest-for-my-team"
  ? Pick<
      ScheduleOffsetsRequest,
      | "id"
      | "purposeText"
      | "dateOfNewSchedule"
      | "dateOfStartNewSchedule"
      | "detailsOfActualWork"
      | "agree"
      | "acquainted"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
      | "personGroup"
      | "purpose"
      | "currentSchedule"
      | "newSchedule"
      | "status"
    >
  : never;
