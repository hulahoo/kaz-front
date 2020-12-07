import { AbstractTimeBasedEntity } from "./AbstractTimeBasedEntity";
import { JobGroup } from "./tsadv$JobGroup";
import { InfoSalaryMarket } from "./tsadv$InfoSalaryMarket";
import { DicEmployeeCategory } from "./tsadv$DicEmployeeCategory";
import { DicJobCategory } from "./tsadv$DicJobCategory";
export class Job extends AbstractTimeBasedEntity {
  static NAME = "tsadv$Job";
  jobName?: string | null;
  jobNameLang1?: string | null;
  jobNameLang2?: string | null;
  jobNameLang3?: string | null;
  jobNameLang4?: string | null;
  jobNameLang5?: string | null;
  group?: JobGroup | null;
  instruction?: any | null;
  instructionName?: string | null;
  infoSalaryMarket?: InfoSalaryMarket[] | null;
  employeeCategory?: DicEmployeeCategory | null;
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
  jobCategory?: DicJobCategory | null;
  candidateRequirements?: string | null;
  jobDescription?: string | null;
}
export type JobViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "job.edit"
  | "job.instruction"
  | "job.view";
export type JobView<V extends JobViewName> = V extends "_minimal"
  ? Pick<Job, "id" | "jobName">
  : V extends "_local"
  ? Pick<
      Job,
      | "id"
      | "jobNameLang1"
      | "jobNameLang2"
      | "jobNameLang3"
      | "jobNameLang4"
      | "jobNameLang5"
      | "instruction"
      | "instructionName"
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
      | "candidateRequirements"
      | "jobDescription"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : V extends "_base"
  ? Pick<
      Job,
      | "id"
      | "jobName"
      | "jobNameLang1"
      | "jobNameLang2"
      | "jobNameLang3"
      | "jobNameLang4"
      | "jobNameLang5"
      | "instruction"
      | "instructionName"
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
      | "candidateRequirements"
      | "jobDescription"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : V extends "job.edit"
  ? Pick<
      Job,
      | "id"
      | "jobNameLang1"
      | "jobNameLang2"
      | "jobNameLang3"
      | "jobNameLang4"
      | "jobNameLang5"
      | "instruction"
      | "instructionName"
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
      | "candidateRequirements"
      | "jobDescription"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
      | "group"
      | "infoSalaryMarket"
      | "employeeCategory"
      | "jobCategory"
    >
  : V extends "job.instruction"
  ? Pick<Job, "id" | "instruction" | "instructionName">
  : V extends "job.view"
  ? Pick<Job, "id" | "jobName" | "startDate" | "endDate">
  : never;
