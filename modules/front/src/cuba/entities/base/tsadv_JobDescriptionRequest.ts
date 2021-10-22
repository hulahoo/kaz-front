import { AbstractBprocRequest } from "./AbstractBprocRequest";
import { PositionGroupExt } from "./base$PositionGroupExt";
import { FileDescriptor } from "./sys$FileDescriptor";
export class JobDescriptionRequest extends AbstractBprocRequest {
  static NAME = "tsadv_JobDescriptionRequest";
  positionGroup?: PositionGroupExt | null;
  basicInteractionsAtWork?: string | null;
  positionDuties?: string | null;
  generalAdditionalRequirements?: string | null;
  compulsoryQualificationRequirements?: string | null;
  file?: FileDescriptor | null;
}
export type JobDescriptionRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "jobDescriptionRequest-edit";
export type JobDescriptionRequestView<
  V extends JobDescriptionRequestViewName
> = V extends "_base"
  ? Pick<
      JobDescriptionRequest,
      | "id"
      | "requestNumber"
      | "basicInteractionsAtWork"
      | "positionDuties"
      | "generalAdditionalRequirements"
      | "compulsoryQualificationRequirements"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestDate"
      | "comment"
    >
  : V extends "_local"
  ? Pick<
      JobDescriptionRequest,
      | "id"
      | "basicInteractionsAtWork"
      | "positionDuties"
      | "generalAdditionalRequirements"
      | "compulsoryQualificationRequirements"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
    >
  : V extends "_minimal"
  ? Pick<JobDescriptionRequest, "id" | "requestNumber">
  : V extends "jobDescriptionRequest-edit"
  ? Pick<
      JobDescriptionRequest,
      | "id"
      | "basicInteractionsAtWork"
      | "positionDuties"
      | "generalAdditionalRequirements"
      | "compulsoryQualificationRequirements"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
      | "positionGroup"
      | "file"
      | "status"
    >
  : never;
