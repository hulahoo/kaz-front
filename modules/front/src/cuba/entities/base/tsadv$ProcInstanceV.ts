import { StandardEntity } from "./sys$StandardEntity";
import { UserExt } from "./base$UserExt";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { ProcDefinition } from "./bpm$ProcDefinition";
import { ProcInstance } from "./bpm$ProcInstance";
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
  procDefinition?: ProcDefinition | null;
  procInstance?: ProcInstance | null;
}
export type ProcInstanceVViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "procInstanceV-view";
export type ProcInstanceVView<
  V extends ProcInstanceVViewName
> = V extends "_minimal"
  ? Pick<ProcInstanceV, "id" | "requestType" | "requestNumber">
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
  : V extends "_base"
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
