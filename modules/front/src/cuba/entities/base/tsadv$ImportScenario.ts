import { AbstractParentEntity } from "./AbstractParentEntity";
import { FileDescriptor } from "./sys$FileDescriptor";
import { ImportLog } from "./tsadv$ImportLog";
export class ImportScenario extends AbstractParentEntity {
  static NAME = "tsadv$ImportScenario";
  name?: string | null;
  template?: FileDescriptor | null;
  comment?: string | null;
  importerBeanName?: string | null;
  log?: ImportLog[] | null;
}
export type ImportScenarioViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "importScenario.view";
export type ImportScenarioView<
  V extends ImportScenarioViewName
> = V extends "_minimal"
  ? Pick<ImportScenario, "id" | "name">
  : V extends "_local"
  ? Pick<
      ImportScenario,
      | "id"
      | "name"
      | "comment"
      | "importerBeanName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      ImportScenario,
      | "id"
      | "name"
      | "comment"
      | "importerBeanName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "importScenario.view"
  ? Pick<
      ImportScenario,
      | "id"
      | "name"
      | "comment"
      | "importerBeanName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "template"
      | "log"
    >
  : never;
