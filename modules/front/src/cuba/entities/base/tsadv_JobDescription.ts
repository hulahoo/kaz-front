import { AbstractParentEntity } from "./AbstractParentEntity";
import { PositionGroupExt } from "./base$PositionGroupExt";
import { FileDescriptor } from "./sys$FileDescriptor";
import { JobDescriptionRequest } from "./tsadv_JobDescriptionRequest";
export class JobDescription extends AbstractParentEntity {
  static NAME = "tsadv_JobDescription";
  positionGroup?: PositionGroupExt | null;
  basicInteractionsAtWork?: string | null;
  positionDuties?: string | null;
  generalAdditionalRequirements?: string | null;
  compulsoryQualificationRequirements?: string | null;
  file?: FileDescriptor | null;
  request?: JobDescriptionRequest | null;
}
export type JobDescriptionViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "jobDescription-for-position-edit";
export type JobDescriptionView<
  V extends JobDescriptionViewName
> = V extends "_base"
  ? Pick<
      JobDescription,
      | "id"
      | "basicInteractionsAtWork"
      | "positionDuties"
      | "generalAdditionalRequirements"
      | "compulsoryQualificationRequirements"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      JobDescription,
      | "id"
      | "basicInteractionsAtWork"
      | "positionDuties"
      | "generalAdditionalRequirements"
      | "compulsoryQualificationRequirements"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "jobDescription-for-position-edit"
  ? Pick<
      JobDescription,
      | "id"
      | "basicInteractionsAtWork"
      | "positionDuties"
      | "generalAdditionalRequirements"
      | "compulsoryQualificationRequirements"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "positionGroup"
      | "file"
      | "request"
    >
  : never;
