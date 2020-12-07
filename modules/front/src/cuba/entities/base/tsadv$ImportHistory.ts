import { StandardEntity } from "./sys$StandardEntity";
import { FileDescriptor } from "./sys$FileDescriptor";
import { ImportScenario } from "./tsadv$ImportScenario";
import { ImportHistoryLog } from "./tsadv$ImportHistoryLog";
export class ImportHistory extends StandardEntity {
  static NAME = "tsadv$ImportHistory";
  file?: FileDescriptor | null;
  importScenario?: ImportScenario | null;
  records?: ImportHistoryLog[] | null;
  started?: any | null;
  finished?: any | null;
}
export type ImportHistoryViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "importHistory.browse";
export type ImportHistoryView<
  V extends ImportHistoryViewName
> = V extends "_local"
  ? Pick<ImportHistory, "id" | "started" | "finished">
  : V extends "_base"
  ? Pick<ImportHistory, "id" | "started" | "finished">
  : V extends "importHistory.browse"
  ? Pick<
      ImportHistory,
      "id" | "started" | "finished" | "file" | "importScenario" | "records"
    >
  : never;
