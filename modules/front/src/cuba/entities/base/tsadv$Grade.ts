import { AbstractTimeBasedEntity } from "./AbstractTimeBasedEntity";
import { GradeGroup } from "./tsadv$GradeGroup";
export class Grade extends AbstractTimeBasedEntity {
  static NAME = "tsadv$Grade";
  gradeName?: string | null;
  recognitionNominate?: boolean | null;
  group?: GradeGroup | null;
}
export type GradeViewName = "_base" | "_local" | "_minimal" | "grade.edit";
export type GradeView<V extends GradeViewName> = V extends "_base"
  ? Pick<
      Grade,
      | "id"
      | "gradeName"
      | "recognitionNominate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : V extends "_local"
  ? Pick<
      Grade,
      | "id"
      | "gradeName"
      | "recognitionNominate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : V extends "_minimal"
  ? Pick<Grade, "id" | "gradeName">
  : V extends "grade.edit"
  ? Pick<
      Grade,
      | "id"
      | "gradeName"
      | "recognitionNominate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
      | "group"
    >
  : never;
