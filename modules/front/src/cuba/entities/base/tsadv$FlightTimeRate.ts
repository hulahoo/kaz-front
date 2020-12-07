import { AbstractParentEntity } from "./AbstractParentEntity";
import { PositionGroupExt } from "./base$PositionGroupExt";
import { DicRateType } from "./tsadv$DicRateType";
export class FlightTimeRate extends AbstractParentEntity {
  static NAME = "tsadv$FlightTimeRate";
  value?: any | null;
  positionGroupName?: PositionGroupExt | null;
  dicRateType?: DicRateType | null;
  dateFrom?: any | null;
  dateTo?: any | null;
  hoursFrom?: any | null;
  hoursTo?: any | null;
}
export type FlightTimeRateViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "flightTimeRate-view";
export type FlightTimeRateView<
  V extends FlightTimeRateViewName
> = V extends "_local"
  ? Pick<
      FlightTimeRate,
      | "id"
      | "value"
      | "dateFrom"
      | "dateTo"
      | "hoursFrom"
      | "hoursTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      FlightTimeRate,
      | "id"
      | "value"
      | "dateFrom"
      | "dateTo"
      | "hoursFrom"
      | "hoursTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "flightTimeRate-view"
  ? Pick<
      FlightTimeRate,
      | "id"
      | "value"
      | "dateFrom"
      | "dateTo"
      | "hoursFrom"
      | "hoursTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "positionGroupName"
      | "dicRateType"
    >
  : never;
