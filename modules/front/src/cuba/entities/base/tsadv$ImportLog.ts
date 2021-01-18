import { AbstractParentEntity } from "./AbstractParentEntity";
import { FileDescriptor } from "./sys$FileDescriptor";
import { ImportLogRecord } from "./tsadv$ImportLogRecord";
import { ImportScenario } from "./tsadv$ImportScenario";
export class ImportLog extends AbstractParentEntity {
  static NAME = "tsadv$ImportLog";
  file?: FileDescriptor | null;
  started?: any | null;
  finished?: any | null;
  entitiesProcessed?: number | null;
  records?: ImportLogRecord[] | null;
  importScenario?: ImportScenario | null;
}
export type ImportLogViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "importLog.view";
export type ImportLogView<V extends ImportLogViewName> = V extends "_base"
  ? Pick<
      ImportLog,
      | "id"
      | "started"
      | "finished"
      | "entitiesProcessed"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      ImportLog,
      | "id"
      | "started"
      | "finished"
      | "entitiesProcessed"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<ImportLog, "id" | "started" | "finished">
  : V extends "importLog.view"
  ? Pick<
      ImportLog,
      | "id"
      | "started"
      | "finished"
      | "entitiesProcessed"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "file"
      | "records"
      | "importScenario"
    >
  : never;
