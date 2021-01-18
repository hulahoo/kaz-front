import { AbstractEntityInt } from "./tsadv$AbstractEntityInt";
export class RequisitionInt extends AbstractEntityInt {
  static NAME = "tsadv$RequisitionInt";
  code?: string | null;
  requiredTest?: boolean | null;
  videoInterviewRequired?: boolean | null;
  job?: string | null;
  posCount?: number | null;
  cityName?: string | null;
  city?: any | null;
  categoryName?: string | null;
  category?: any | null;
  startDate?: string | null;
  endDate?: string | null;
  finalDate?: string | null;
  description?: string | null;
  country?: any | null;
  countryName?: string | null;
  latitude?: any | null;
  longitude?: any | null;
}
export type RequisitionIntViewName = "_base" | "_local" | "_minimal";
export type RequisitionIntView<
  V extends RequisitionIntViewName
> = V extends "_base"
  ? Pick<RequisitionInt, "id" | "code">
  : V extends "_minimal"
  ? Pick<RequisitionInt, "id" | "code">
  : never;
