import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicEducationDegree } from "./tsadv$DicEducationDegree";
import { DicEducationLevel } from "./tsadv$DicEducationLevel";
export class PersonEducation extends AbstractParentEntity {
  static NAME = "tsadv$PersonEducation";
  personGroup?: PersonGroupExt | null;
  diplomaNumber?: string | null;
  graduationDate?: any | null;
  foreignEducation?: boolean | null;
  school?: string | null;
  startYear?: number | null;
  endYear?: number | null;
  specialization?: string | null;
  degree?: DicEducationDegree | null;
  location?: string | null;
  level?: DicEducationLevel | null;
}
export type PersonEducationViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "personEducation.full"
  | "personEducation.view";
export type PersonEducationView<
  V extends PersonEducationViewName
> = V extends "_base"
  ? Pick<
      PersonEducation,
      | "id"
      | "school"
      | "startYear"
      | "endYear"
      | "diplomaNumber"
      | "graduationDate"
      | "foreignEducation"
      | "specialization"
      | "location"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PersonEducation,
      | "id"
      | "diplomaNumber"
      | "graduationDate"
      | "foreignEducation"
      | "school"
      | "startYear"
      | "endYear"
      | "specialization"
      | "location"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<PersonEducation, "id" | "school" | "startYear" | "endYear">
  : V extends "personEducation.full"
  ? Pick<
      PersonEducation,
      | "id"
      | "diplomaNumber"
      | "graduationDate"
      | "foreignEducation"
      | "school"
      | "startYear"
      | "endYear"
      | "specialization"
      | "location"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "personGroup"
      | "degree"
      | "level"
    >
  : V extends "personEducation.view"
  ? Pick<
      PersonEducation,
      | "id"
      | "diplomaNumber"
      | "graduationDate"
      | "foreignEducation"
      | "school"
      | "startYear"
      | "endYear"
      | "specialization"
      | "location"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "personGroup"
      | "degree"
      | "level"
    >
  : never;
