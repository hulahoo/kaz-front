import { AbstractParentEntity } from "./AbstractParentEntity";
import { Order } from "./tsadv$Order";
import { DicBusinessTripType } from "./tsadv$DicBusinessTripType";
import { OrdAssignment } from "./tsadv$OrdAssignment";
import { BusinessTripLines } from "./tsadv$BusinessTripLines";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class BusinessTrip extends AbstractParentEntity {
  static NAME = "tsadv$BusinessTrip";
  dateFrom?: any | null;
  reason?: string | null;
  order?: Order | null;
  orderNum?: string | null;
  orderDate?: any | null;
  status?: any | null;
  typeTrip?: any | null;
  cancelOrderNumber?: string | null;
  cancelOrderDate?: any | null;
  parentBusinessTrip?: BusinessTrip | null;
  dateTo?: any | null;
  purpose?: string | null;
  type?: DicBusinessTripType | null;
  ordAssignment?: OrdAssignment | null;
  businessTripLines?: BusinessTripLines[] | null;
  personGroup?: PersonGroupExt | null;
  route?: string | null;
  absenceDays?: number | null;
  businessTripWithDate?: string | null;
  parentBusinessTripCaption?: string | null;
}
export type BusinessTripViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "businessTrip-like-absence"
  | "businessTrip-view";
export type BusinessTripView<V extends BusinessTripViewName> = V extends "_base"
  ? Pick<
      BusinessTrip,
      | "id"
      | "purpose"
      | "type"
      | "dateFrom"
      | "dateTo"
      | "reason"
      | "orderNum"
      | "orderDate"
      | "status"
      | "typeTrip"
      | "cancelOrderNumber"
      | "cancelOrderDate"
      | "route"
      | "absenceDays"
      | "businessTripWithDate"
      | "parentBusinessTripCaption"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      BusinessTrip,
      | "id"
      | "dateFrom"
      | "reason"
      | "orderNum"
      | "orderDate"
      | "status"
      | "typeTrip"
      | "cancelOrderNumber"
      | "cancelOrderDate"
      | "dateTo"
      | "purpose"
      | "route"
      | "absenceDays"
      | "businessTripWithDate"
      | "parentBusinessTripCaption"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<BusinessTrip, "id" | "purpose" | "type" | "dateFrom" | "dateTo">
  : V extends "businessTrip-like-absence"
  ? Pick<
      BusinessTrip,
      | "id"
      | "dateFrom"
      | "reason"
      | "orderNum"
      | "orderDate"
      | "status"
      | "typeTrip"
      | "cancelOrderNumber"
      | "cancelOrderDate"
      | "dateTo"
      | "purpose"
      | "route"
      | "absenceDays"
      | "businessTripWithDate"
      | "parentBusinessTripCaption"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "type"
      | "personGroup"
    >
  : V extends "businessTrip-view"
  ? Pick<
      BusinessTrip,
      | "id"
      | "dateFrom"
      | "reason"
      | "orderNum"
      | "orderDate"
      | "status"
      | "typeTrip"
      | "cancelOrderNumber"
      | "cancelOrderDate"
      | "dateTo"
      | "purpose"
      | "route"
      | "absenceDays"
      | "businessTripWithDate"
      | "parentBusinessTripCaption"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "type"
      | "businessTripLines"
      | "personGroup"
      | "order"
      | "route"
      | "parentBusinessTrip"
      | "businessTripWithDate"
    >
  : never;
