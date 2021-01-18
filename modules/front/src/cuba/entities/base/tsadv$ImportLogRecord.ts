import { AbstractParentEntity } from "./AbstractParentEntity";
import { ImportLog } from "./tsadv$ImportLog";
export class ImportLogRecord extends AbstractParentEntity {
  static NAME = "tsadv$ImportLogRecord";
  message?: string | null;
  fullName?: string | null;
  userMessage?: string | null;
  success?: boolean | null;
  level?: any | null;
  time?: any | null;
  stacktrace?: string | null;
  importLog?: ImportLog | null;
  linkScreen?: string | null;
  linkEntityName?: string | null;
  linkEntityId?: any | null;
}
export type ImportLogRecordViewName = "_base" | "_local" | "_minimal";
export type ImportLogRecordView<
  V extends ImportLogRecordViewName
> = V extends "_base"
  ? Pick<
      ImportLogRecord,
      | "id"
      | "level"
      | "message"
      | "fullName"
      | "userMessage"
      | "success"
      | "time"
      | "stacktrace"
      | "linkScreen"
      | "linkEntityName"
      | "linkEntityId"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      ImportLogRecord,
      | "id"
      | "message"
      | "fullName"
      | "userMessage"
      | "success"
      | "level"
      | "time"
      | "stacktrace"
      | "linkScreen"
      | "linkEntityName"
      | "linkEntityId"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<ImportLogRecord, "id" | "level" | "message">
  : never;
