import { StandardEntity } from "./sys$StandardEntity";
import { UserExt } from "./tsadv$UserExt";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class ProcInstanceV extends StandardEntity {
  static NAME = "tsadv$ProcInstanceV";
  requestType?: string | null;
  processRu?: string | null;
  processEn?: string | null;
  entityName?: string | null;
  entityId?: any | null;
  requestNumber?: string | null;
  active?: boolean | null;
  startedBy?: UserExt | null;
  startedByPersonGroup?: PersonGroupExt | null;
  startDate?: any | null;
  endDate?: any | null;
  effectiveDate?: any | null;
  cancelled?: boolean | null;
  entity?: BaseUuidEntity | null;
  personGroup?: PersonGroupExt | null;
  currentApprover?: UserExt | null;
  detailRu?: string | null;
  detailEn?: string | null;
  detail?: string | null;
}
export type ProcInstanceVViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "procInstanceV-view";
export type ProcInstanceVView<
  V extends ProcInstanceVViewName
> = V extends "_base"
  ? Pick<
      ProcInstanceV,
      | "id"
      | "requestType"
      | "requestNumber"
      | "processRu"
      | "processEn"
      | "entityName"
      | "entityId"
      | "active"
      | "startDate"
      | "endDate"
      | "effectiveDate"
      | "cancelled"
      | "detailRu"
      | "detailEn"
    >
  : V extends "_local"
  ? Pick<
      ProcInstanceV,
      | "id"
      | "processRu"
      | "processEn"
      | "entityName"
      | "entityId"
      | "requestNumber"
      | "active"
      | "startDate"
      | "endDate"
      | "effectiveDate"
      | "cancelled"
      | "detailRu"
      | "detailEn"
    >
  : V extends "_minimal"
  ? Pick<ProcInstanceV, "id" | "requestType" | "requestNumber">
  : V extends "procInstanceV-view"
  ? Pick<
      ProcInstanceV,
      | "id"
      | "requestType"
      | "requestNumber"
      | "processRu"
      | "processEn"
      | "entityName"
      | "entityId"
      | "active"
      | "startDate"
      | "endDate"
      | "effectiveDate"
      | "cancelled"
      | "detailRu"
      | "detailEn"
      | "startedBy"
    >
  : never;
