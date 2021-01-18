import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicEducationalEstablishment } from "./tsadv$DicEducationalEstablishment";
import { DicEducationType } from "./base$DicEducationType";
import { DicEducationDegree } from "./tsadv$DicEducationDegree";
import { DicEducationLevel } from "./tsadv$DicEducationLevel";
import { DicFormStudy } from "./tsadv_DicFormStudy";
import { DicRequestStatus } from "./tsadv$DicRequestStatus";
import { FileDescriptor } from "./sys$FileDescriptor";
export class PersonEducationRequest extends AbstractParentEntity {
  static NAME = "tsadv_PersonEducationRequest";
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
  status?: DicRequestStatus | null;
  file?: FileDescriptor | null;
  attachments?: FileDescriptor[] | null;
}
export type PersonEducationRequestViewName = "_base" | "_local" | "_minimal";
export type PersonEducationRequestView<
  V extends PersonEducationRequestViewName
> = V extends "_base"
  ? Pick<
      PersonEducationRequest,
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
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PersonEducationRequest,
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
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
