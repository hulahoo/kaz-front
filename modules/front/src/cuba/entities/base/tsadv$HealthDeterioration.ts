import { AbstractParentEntity } from "./AbstractParentEntity";
import { Complaint } from "./tsadv$Complaint";
import { HealthDeteriorationWitnesses } from "./tsadv$HealthDeteriorationWitnesses";
import { Attachment } from "./tsadv$Attachment";
import { PersonExt } from "./base$PersonExt";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { Result } from "./tsadv$Result";
import { WorkPlace } from "./tsadv$WorkPlace";
export class HealthDeterioration extends AbstractParentEntity {
  static NAME = "tsadv$HealthDeterioration";
  date?: any | null;
  complaint?: Complaint[] | null;
  witnesses?: HealthDeteriorationWitnesses[] | null;
  attachment?: Attachment[] | null;
  sickPerson?: PersonExt | null;
  managerPerson?: PersonExt | null;
  organization?: OrganizationGroupExt | null;
  result?: Result | null;
  time?: any | null;
  startShift?: any | null;
  endShift?: any | null;
  workPlace?: WorkPlace | null;
  preliminaryDiagnosis?: string | null;
  description?: string | null;
  reason?: string | null;
  sticknessStartDate?: any | null;
  sticknessEndDate?: any | null;
  finalDiagnosis?: string | null;
  resultDate?: any | null;
}
export type HealthDeteriorationViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "healthDeterioration-view";
export type HealthDeteriorationView<
  V extends HealthDeteriorationViewName
> = V extends "_base"
  ? Pick<
      HealthDeterioration,
      | "id"
      | "date"
      | "time"
      | "startShift"
      | "endShift"
      | "preliminaryDiagnosis"
      | "description"
      | "reason"
      | "sticknessStartDate"
      | "sticknessEndDate"
      | "finalDiagnosis"
      | "resultDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      HealthDeterioration,
      | "id"
      | "date"
      | "time"
      | "startShift"
      | "endShift"
      | "preliminaryDiagnosis"
      | "description"
      | "reason"
      | "sticknessStartDate"
      | "sticknessEndDate"
      | "finalDiagnosis"
      | "resultDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "healthDeterioration-view"
  ? Pick<
      HealthDeterioration,
      | "id"
      | "date"
      | "sickPerson"
      | "managerPerson"
      | "organization"
      | "result"
      | "time"
      | "startShift"
      | "endShift"
      | "preliminaryDiagnosis"
      | "description"
      | "reason"
      | "sticknessStartDate"
      | "sticknessEndDate"
      | "finalDiagnosis"
      | "resultDate"
      | "workPlace"
      | "complaint"
      | "witnesses"
      | "attachment"
    >
  : never;
