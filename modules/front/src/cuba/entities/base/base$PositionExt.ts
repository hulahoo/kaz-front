import { Position } from "./base$Position";
import { DicCostCenter } from "./tsadv$DicCostCenter";
import { JobGroup } from "./tsadv$JobGroup";
import { GradeGroup } from "./tsadv$GradeGroup";
import { PositionGroupExt } from "./base$PositionGroupExt";
import { DicPayroll } from "./tsadv$DicPayroll";
import { DicPositionStatus } from "./tsadv$DicPositionStatus";
import { GradeRule } from "./tsadv$GradeRule";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { DicEmployeeCategory } from "./tsadv$DicEmployeeCategory";
export class PositionExt extends Position {
  static NAME = "base$PositionExt";
  costCenter?: DicCostCenter | null;
  candidateRequirementsLang1?: string | null;
  candidateRequirementsLang2?: string | null;
  candidateRequirementsLang3?: string | null;
  candidateRequirementsLang4?: string | null;
  candidateRequirementsLang5?: string | null;
  jobDescriptionLang1?: string | null;
  jobDescriptionLang2?: string | null;
  jobDescriptionLang3?: string | null;
  jobDescriptionLang4?: string | null;
  jobDescriptionLang5?: string | null;
  positionFullName?: string | null;
  baza?: string | null;
  extra?: string | null;
  jobGroup?: JobGroup | null;
  gradeGroup?: GradeGroup | null;
  group?: PositionGroupExt | null;
  payroll?: DicPayroll | null;
  positionStatus?: DicPositionStatus | null;
  gradeRule?: GradeRule | null;
  organizationGroupExt?: OrganizationGroupExt | null;
  employeeCategory?: DicEmployeeCategory | null;
  positionNameLang1Reducted?: string | null;
  positionNameLang2Reducted?: string | null;
  positionNameLang3Reducted?: string | null;
}
export type PositionExtViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "position-view"
  | "position.attestation.participant"
  | "position.browse"
  | "position.edit"
  | "position.forJobEdit"
  | "positionExt.view.for.candidate";
export type PositionExtView<V extends PositionExtViewName> = V extends "_base"
  ? Pick<
      PositionExt,
      | "id"
      | "positionName"
      | "candidateRequirementsLang1"
      | "candidateRequirementsLang2"
      | "candidateRequirementsLang3"
      | "candidateRequirementsLang4"
      | "candidateRequirementsLang5"
      | "jobDescriptionLang1"
      | "jobDescriptionLang2"
      | "jobDescriptionLang3"
      | "jobDescriptionLang4"
      | "jobDescriptionLang5"
      | "baza"
      | "extra"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
      | "positionFullNameLang1"
      | "positionFullNameLang2"
      | "positionFullNameLang3"
      | "positionFullNameLang4"
      | "positionFullNameLang5"
      | "positionNameLang1"
      | "positionNameLang2"
      | "positionNameLang3"
      | "positionNameLang4"
      | "positionNameLang5"
      | "managerFlag"
      | "fte"
      | "maxPersons"
    >
  : V extends "_local"
  ? Pick<
      PositionExt,
      | "id"
      | "candidateRequirementsLang1"
      | "candidateRequirementsLang2"
      | "candidateRequirementsLang3"
      | "candidateRequirementsLang4"
      | "candidateRequirementsLang5"
      | "jobDescriptionLang1"
      | "jobDescriptionLang2"
      | "jobDescriptionLang3"
      | "jobDescriptionLang4"
      | "jobDescriptionLang5"
      | "baza"
      | "extra"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
      | "positionFullNameLang1"
      | "positionFullNameLang2"
      | "positionFullNameLang3"
      | "positionFullNameLang4"
      | "positionFullNameLang5"
      | "positionNameLang1"
      | "positionNameLang2"
      | "positionNameLang3"
      | "positionNameLang4"
      | "positionNameLang5"
      | "managerFlag"
      | "fte"
      | "maxPersons"
    >
  : V extends "_minimal"
  ? Pick<PositionExt, "id" | "positionName">
  : V extends "position-view"
  ? Pick<
      PositionExt,
      | "id"
      | "candidateRequirementsLang1"
      | "candidateRequirementsLang2"
      | "candidateRequirementsLang3"
      | "candidateRequirementsLang4"
      | "candidateRequirementsLang5"
      | "jobDescriptionLang1"
      | "jobDescriptionLang2"
      | "jobDescriptionLang3"
      | "jobDescriptionLang4"
      | "jobDescriptionLang5"
      | "baza"
      | "extra"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
      | "positionFullNameLang1"
      | "positionFullNameLang2"
      | "positionFullNameLang3"
      | "positionFullNameLang4"
      | "positionFullNameLang5"
      | "positionNameLang1"
      | "positionNameLang2"
      | "positionNameLang3"
      | "positionNameLang4"
      | "positionNameLang5"
      | "managerFlag"
      | "fte"
      | "maxPersons"
      | "payroll"
      | "positionStatus"
      | "jobGroup"
      | "gradeGroup"
      | "location"
      | "group"
      | "updatedBy"
      | "gradeRule"
      | "costCenter"
      | "positionFullName"
      | "organizationGroupExt"
    >
  : V extends "position.attestation.participant"
  ? Pick<
      PositionExt,
      | "id"
      | "positionName"
      | "startDate"
      | "endDate"
      | "positionNameLang1"
      | "positionNameLang2"
      | "positionNameLang3"
      | "positionNameLang4"
      | "positionNameLang5"
      | "employeeCategory"
    >
  : V extends "position.browse"
  ? Pick<
      PositionExt,
      | "id"
      | "candidateRequirementsLang1"
      | "candidateRequirementsLang2"
      | "candidateRequirementsLang3"
      | "candidateRequirementsLang4"
      | "candidateRequirementsLang5"
      | "jobDescriptionLang1"
      | "jobDescriptionLang2"
      | "jobDescriptionLang3"
      | "jobDescriptionLang4"
      | "jobDescriptionLang5"
      | "baza"
      | "extra"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
      | "positionFullNameLang1"
      | "positionFullNameLang2"
      | "positionFullNameLang3"
      | "positionFullNameLang4"
      | "positionFullNameLang5"
      | "positionNameLang1"
      | "positionNameLang2"
      | "positionNameLang3"
      | "positionNameLang4"
      | "positionNameLang5"
      | "managerFlag"
      | "fte"
      | "maxPersons"
      | "jobGroup"
    >
  : V extends "position.edit"
  ? Pick<
      PositionExt,
      | "id"
      | "candidateRequirementsLang1"
      | "candidateRequirementsLang2"
      | "candidateRequirementsLang3"
      | "candidateRequirementsLang4"
      | "candidateRequirementsLang5"
      | "jobDescriptionLang1"
      | "jobDescriptionLang2"
      | "jobDescriptionLang3"
      | "jobDescriptionLang4"
      | "jobDescriptionLang5"
      | "baza"
      | "extra"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
      | "positionFullNameLang1"
      | "positionFullNameLang2"
      | "positionFullNameLang3"
      | "positionFullNameLang4"
      | "positionFullNameLang5"
      | "positionNameLang1"
      | "positionNameLang2"
      | "positionNameLang3"
      | "positionNameLang4"
      | "positionNameLang5"
      | "managerFlag"
      | "fte"
      | "maxPersons"
      | "costCenter"
      | "jobGroup"
      | "gradeGroup"
      | "group"
      | "payroll"
      | "positionStatus"
      | "gradeRule"
      | "organizationGroupExt"
      | "employeeCategory"
      | "location"
    >
  : V extends "position.forJobEdit"
  ? Pick<
      PositionExt,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "candidateRequirementsLang1"
      | "candidateRequirementsLang2"
      | "candidateRequirementsLang3"
      | "candidateRequirementsLang4"
      | "candidateRequirementsLang5"
      | "jobDescriptionLang1"
      | "jobDescriptionLang2"
      | "jobDescriptionLang3"
      | "jobDescriptionLang4"
      | "jobDescriptionLang5"
      | "baza"
      | "extra"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
      | "positionFullNameLang1"
      | "positionFullNameLang2"
      | "positionFullNameLang3"
      | "positionFullNameLang4"
      | "positionFullNameLang5"
      | "positionNameLang1"
      | "positionNameLang2"
      | "positionNameLang3"
      | "positionNameLang4"
      | "positionNameLang5"
      | "managerFlag"
      | "fte"
      | "maxPersons"
      | "costCenter"
      | "jobGroup"
      | "group"
      | "location"
    >
  : V extends "positionExt.view.for.candidate"
  ? Pick<
      PositionExt,
      | "id"
      | "candidateRequirementsLang1"
      | "candidateRequirementsLang2"
      | "candidateRequirementsLang3"
      | "candidateRequirementsLang4"
      | "candidateRequirementsLang5"
      | "jobDescriptionLang1"
      | "jobDescriptionLang2"
      | "jobDescriptionLang3"
      | "jobDescriptionLang4"
      | "jobDescriptionLang5"
      | "baza"
      | "extra"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
      | "positionFullNameLang1"
      | "positionFullNameLang2"
      | "positionFullNameLang3"
      | "positionFullNameLang4"
      | "positionFullNameLang5"
      | "positionNameLang1"
      | "positionNameLang2"
      | "positionNameLang3"
      | "positionNameLang4"
      | "positionNameLang5"
      | "managerFlag"
      | "fte"
      | "maxPersons"
      | "organizationGroupExt"
      | "group"
      | "jobGroup"
    >
  : never;
