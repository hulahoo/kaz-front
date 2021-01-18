import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicEducationType } from "./tsadv$DicEducationType";
export class Education extends AbstractParentEntity {
  static NAME = "tsadv$Education";
  person?: PersonGroupExt | null;
  scholl?: string | null;
  faculty?: string | null;
  startYear?: number | null;
  endYear?: number | null;
  specialization?: string | null;
  qualification?: string | null;
  educationType?: DicEducationType | null;
}
export type EducationViewName = "_base" | "_local" | "_minimal";
export type EducationView<V extends EducationViewName> = V extends "_base"
  ? Pick<
      Education,
      | "id"
      | "educationType"
      | "startYear"
      | "endYear"
      | "faculty"
      | "person"
      | "qualification"
      | "scholl"
      | "specialization"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Education,
      | "id"
      | "scholl"
      | "faculty"
      | "startYear"
      | "endYear"
      | "specialization"
      | "qualification"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<
      Education,
      | "id"
      | "educationType"
      | "startYear"
      | "endYear"
      | "faculty"
      | "person"
      | "qualification"
      | "scholl"
      | "specialization"
    >
  : never;
