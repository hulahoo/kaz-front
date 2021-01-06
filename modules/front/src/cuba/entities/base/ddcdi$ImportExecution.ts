import { StandardEntity } from "./sys$StandardEntity";
import { FileDescriptor } from "./sys$FileDescriptor";
import { ImportExecutionDetail } from "./ddcdi$ImportExecutionDetail";
import { ImportConfiguration } from "./ddcdi$ImportConfiguration";
export class ImportExecution extends StandardEntity {
  static NAME = "ddcdi$ImportExecution";
  file?: FileDescriptor | null;
  details?: ImportExecutionDetail[] | null;
  startedAt?: any | null;
  finishedAt?: any | null;
  entitiesProcessed?: number | null;
  entitiesImportSuccess?: number | null;
  entitiesImportValidationError?: number | null;
  entitiesPreCommitSkipped?: number | null;
  entitiesUniqueConstraintSkipped?: number | null;
  success?: boolean | null;
  configuration?: ImportConfiguration | null;
}
export type ImportExecutionViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "importExecution-view"
  | "importExecution-with-details-view";
export type ImportExecutionView<
  V extends ImportExecutionViewName
> = V extends "_base"
  ? Pick<
      ImportExecution,
      | "id"
      | "startedAt"
      | "finishedAt"
      | "entitiesProcessed"
      | "entitiesImportSuccess"
      | "entitiesImportValidationError"
      | "entitiesPreCommitSkipped"
      | "entitiesUniqueConstraintSkipped"
      | "success"
    >
  : V extends "_local"
  ? Pick<
      ImportExecution,
      | "id"
      | "startedAt"
      | "finishedAt"
      | "entitiesProcessed"
      | "entitiesImportSuccess"
      | "entitiesImportValidationError"
      | "entitiesPreCommitSkipped"
      | "entitiesUniqueConstraintSkipped"
      | "success"
    >
  : V extends "importExecution-view"
  ? Pick<
      ImportExecution,
      | "id"
      | "startedAt"
      | "finishedAt"
      | "entitiesProcessed"
      | "entitiesImportSuccess"
      | "entitiesImportValidationError"
      | "entitiesPreCommitSkipped"
      | "entitiesUniqueConstraintSkipped"
      | "success"
      | "file"
      | "configuration"
    >
  : V extends "importExecution-with-details-view"
  ? Pick<
      ImportExecution,
      | "id"
      | "startedAt"
      | "finishedAt"
      | "entitiesProcessed"
      | "entitiesImportSuccess"
      | "entitiesImportValidationError"
      | "entitiesPreCommitSkipped"
      | "entitiesUniqueConstraintSkipped"
      | "success"
      | "file"
      | "details"
      | "configuration"
    >
  : never;
