import { AbstractParentEntity } from "./AbstractParentEntity";
import { Course } from "./tsadv$Course";
import { FileDescriptor } from "./sys$FileDescriptor";
export class Homework extends AbstractParentEntity {
  static NAME = "tsadv_Homework";
  course?: Course | null;
  instructions?: string | null;
  instructionFile?: FileDescriptor | null;
}
export type HomeworkViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "homework.edit";
export type HomeworkView<V extends HomeworkViewName> = V extends "_base"
  ? Pick<
      Homework,
      | "id"
      | "instructions"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Homework,
      | "id"
      | "instructions"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "homework.edit"
  ? Pick<
      Homework,
      | "id"
      | "instructions"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "course"
      | "instructionFile"
    >
  : never;
