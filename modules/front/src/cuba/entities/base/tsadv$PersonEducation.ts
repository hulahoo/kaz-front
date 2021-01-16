import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicEducationalEstablishment } from "./tsadv$DicEducationalEstablishment";
import { DicEducationType } from "./base$DicEducationType";
import { DicEducationDegree } from "./tsadv$DicEducationDegree";
import { DicEducationLevel } from "./tsadv$DicEducationLevel";
import { DicFormStudy } from "./tsadv_DicFormStudy";
import { FileDescriptor } from "./sys$FileDescriptor";
export class PersonEducation extends AbstractParentEntity {
  static NAME = "tsadv$PersonEducation";
  personGroup?: PersonGroupExt | null;
  diplomaNumber?: string | null;
  graduationDate?: any | null;
  foreignEducation?: boolean | null;
  school?: string | null;
  educationalEstablishment?: DicEducationalEstablishment | null;
  educationType?: DicEducationType | null;
  startYear?: number | null;
  endYear?: number | null;
  specialization?: string | null;
  degree?: DicEducationDegree | null;
  location?: string | null;
  level?: DicEducationLevel | null;
  faculty?: string | null;
  qualification?: string | null;
  formStudy?: DicFormStudy | null;
  startDateHistory?: any | null;
  endDateHistory?: any | null;
  attachments?: FileDescriptor[] | null;
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
      | "faculty"
      | "qualification"
      | "startDateHistory"
      | "endDateHistory"
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
      | "faculty"
      | "qualification"
      | "startDateHistory"
      | "endDateHistory"
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
      | "faculty"
      | "qualification"
      | "startDateHistory"
      | "endDateHistory"
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
      | "faculty"
      | "qualification"
      | "startDateHistory"
      | "endDateHistory"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "personGroup"
      | "degree"
      | "level"
    >
  : never;
