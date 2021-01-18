import { StandardEntity } from "./sys$StandardEntity";
import { ImportExecution } from "./ddcdi$ImportExecution";
import { FileDescriptor } from "./sys$FileDescriptor";
import { ImportAttributeMapper } from "./ddcdi$ImportAttributeMapper";
import { UniqueConfiguration } from "./ddcdi$UniqueConfiguration";
export class ImportConfiguration extends StandardEntity {
  static NAME = "ddcdi$ImportConfiguration";
  name?: string | null;
  transactionStrategy?: any | null;
  entityClass?: string | null;
  adHoc?: boolean | null;
  reuse?: boolean | null;
  logs?: ImportExecution[] | null;
  template?: FileDescriptor | null;
  comment?: string | null;
  importAttributeMappers?: ImportAttributeMapper[] | null;
  uniqueConfigurations?: UniqueConfiguration[] | null;
  dateFormat?: string | null;
  booleanTrueValue?: string | null;
  booleanFalseValue?: string | null;
  preCommitScript?: string | null;
  fileCharset?: string | null;
}
export type ImportConfigurationViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "importConfiguration-view";
export type ImportConfigurationView<
  V extends ImportConfigurationViewName
> = V extends "_base"
  ? Pick<
      ImportConfiguration,
      | "id"
      | "name"
      | "transactionStrategy"
      | "entityClass"
      | "adHoc"
      | "comment"
      | "dateFormat"
      | "booleanTrueValue"
      | "booleanFalseValue"
      | "preCommitScript"
      | "fileCharset"
    >
  : V extends "_local"
  ? Pick<
      ImportConfiguration,
      | "id"
      | "name"
      | "transactionStrategy"
      | "entityClass"
      | "adHoc"
      | "comment"
      | "dateFormat"
      | "booleanTrueValue"
      | "booleanFalseValue"
      | "preCommitScript"
      | "fileCharset"
    >
  : V extends "_minimal"
  ? Pick<ImportConfiguration, "id" | "name">
  : V extends "importConfiguration-view"
  ? Pick<
      ImportConfiguration,
      | "id"
      | "name"
      | "transactionStrategy"
      | "entityClass"
      | "adHoc"
      | "comment"
      | "dateFormat"
      | "booleanTrueValue"
      | "booleanFalseValue"
      | "preCommitScript"
      | "fileCharset"
      | "logs"
      | "template"
      | "importAttributeMappers"
      | "uniqueConfigurations"
    >
  : never;
