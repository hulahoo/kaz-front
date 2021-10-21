import { AbstractBprocRequest } from "./AbstractBprocRequest";
import { TsadvUser } from "./tsadv$UserExt";
export class ProcInstanceV extends AbstractBprocRequest {
  static NAME = "tsadv$ProcInstanceV";
  process?: string | null;
  processRu?: string | null;
  processKz?: string | null;
  processEn?: string | null;
  entityName?: string | null;
  businessKey?: string | null;
  entityId?: any | null;
  active?: boolean | null;
  startUser?: TsadvUser | null;
  startTime?: any | null;
  endTime?: any | null;
  entity?: AbstractBprocRequest | null;
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
      | "process"
      | "requestNumber"
      | "processRu"
      | "processKz"
      | "processEn"
      | "entityName"
      | "businessKey"
      | "entityId"
      | "active"
      | "startTime"
      | "endTime"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestDate"
      | "comment"
    >
  : V extends "_local"
  ? Pick<
      ProcInstanceV,
      | "id"
      | "processRu"
      | "processKz"
      | "processEn"
      | "entityName"
      | "businessKey"
      | "entityId"
      | "active"
      | "startTime"
      | "endTime"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
    >
  : V extends "_minimal"
  ? Pick<ProcInstanceV, "id" | "process" | "requestNumber">
  : V extends "procInstanceV-view"
  ? Pick<
      ProcInstanceV,
      | "id"
      | "process"
      | "requestNumber"
      | "processRu"
      | "processKz"
      | "processEn"
      | "entityName"
      | "businessKey"
      | "entityId"
      | "active"
      | "startTime"
      | "endTime"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestDate"
      | "comment"
      | "startUser"
    >
  : never;
