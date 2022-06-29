import { AbstractParentEntity } from "./AbstractParentEntity";
import { FileDescriptor } from "./sys$FileDescriptor";
export class ConcourseNew extends AbstractParentEntity {
  static NAME = "tsadv_ConcourseNew";
  name_ru?: string | null;
  banner?: FileDescriptor | null;
  name_en?: string | null;
  description?: string | null;
  requestTemplate?: FileDescriptor | null;
}
export type ConcourseNewViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "concourseNew-view";
export type ConcourseNewView<V extends ConcourseNewViewName> = V extends "_base"
  ? Pick<
      ConcourseNew,
      | "id"
      | "description"
      | "name_ru"
      | "name_en"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      ConcourseNew,
      | "id"
      | "name_ru"
      | "name_en"
      | "description"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<ConcourseNew, "id" | "description">
  : V extends "concourseNew-view"
  ? Pick<
      ConcourseNew,
      | "id"
      | "name_ru"
      | "name_en"
      | "description"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "banner"
      | "requestTemplate"
    >
  : never;
