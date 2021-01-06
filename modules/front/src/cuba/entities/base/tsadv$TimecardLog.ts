import { AbstractParentEntity } from "./AbstractParentEntity";
export class TimecardLog extends AbstractParentEntity {
  static NAME = "tsadv$TimecardLog";
  initiatorLogin?: string | null;
  startDate?: any | null;
  endDate?: any | null;
  success?: boolean | null;
  errorText?: string | null;
  durationInSeconds?: any | null;
  timecardsCount?: number | null;
}
export type TimecardLogViewName = "_base" | "_local" | "_minimal";
export type TimecardLogView<V extends TimecardLogViewName> = V extends "_base"
  ? Pick<
      TimecardLog,
      | "id"
      | "initiatorLogin"
      | "startDate"
      | "endDate"
      | "success"
      | "errorText"
      | "durationInSeconds"
      | "timecardsCount"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      TimecardLog,
      | "id"
      | "initiatorLogin"
      | "startDate"
      | "endDate"
      | "success"
      | "errorText"
      | "durationInSeconds"
      | "timecardsCount"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
