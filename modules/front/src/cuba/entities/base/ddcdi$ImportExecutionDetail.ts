import { StandardEntity } from "./sys$StandardEntity";
import { ImportExecution } from "./ddcdi$ImportExecution";
export class ImportExecutionDetail extends StandardEntity {
  static NAME = "ddcdi$ImportExecutionDetail";
  message?: string | null;
  level?: any | null;
  time?: any | null;
  stacktrace?: string | null;
  importExecution?: ImportExecution | null;
  dataRow?: string | null;
  dataRowIndex?: number | null;
  entityInstance?: string | null;
  category?: any | null;
}
export type ImportExecutionDetailViewName = "_base" | "_local" | "_minimal";
export type ImportExecutionDetailView<
  V extends ImportExecutionDetailViewName
> = V extends "_base"
  ? Pick<
      ImportExecutionDetail,
      | "id"
      | "message"
      | "level"
      | "time"
      | "stacktrace"
      | "dataRow"
      | "dataRowIndex"
      | "entityInstance"
      | "category"
    >
  : V extends "_local"
  ? Pick<
      ImportExecutionDetail,
      | "id"
      | "message"
      | "level"
      | "time"
      | "stacktrace"
      | "dataRow"
      | "dataRowIndex"
      | "entityInstance"
      | "category"
    >
  : never;
