import { StandardEntity } from "./sys$StandardEntity";
import { ImportHistory } from "./tsadv$ImportHistory";
export class ImportHistoryLog extends StandardEntity {
  static NAME = "tsadv$ImportHistoryLog";
  message?: string | null;
  stacktrace?: string | null;
  login?: string | null;
  params?: string | null;
  success?: boolean | null;
  dateTime?: any | null;
  entitiesProcessed?: number | null;
  level?: any | null;
  importHistory?: ImportHistory | null;
}
export type ImportHistoryLogViewName = "_minimal" | "_local" | "_base";
export type ImportHistoryLogView<
  V extends ImportHistoryLogViewName
> = V extends "_local"
  ? Pick<
      ImportHistoryLog,
      | "id"
      | "message"
      | "stacktrace"
      | "login"
      | "params"
      | "success"
      | "dateTime"
      | "entitiesProcessed"
      | "level"
    >
  : V extends "_base"
  ? Pick<
      ImportHistoryLog,
      | "id"
      | "message"
      | "stacktrace"
      | "login"
      | "params"
      | "success"
      | "dateTime"
      | "entitiesProcessed"
      | "level"
    >
  : never;
