import { AbstractParentEntity } from "./AbstractParentEntity";
import { Interview } from "./tsadv$Interview";
export class InterviewHistory extends AbstractParentEntity {
  static NAME = "tsadv$InterviewHistory";
  interview?: Interview | null;
  interviewStatus?: any | null;
}
export type InterviewHistoryViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "interviewHistory.view";
export type InterviewHistoryView<
  V extends InterviewHistoryViewName
> = V extends "_minimal"
  ? Pick<InterviewHistory, "id">
  : V extends "_local"
  ? Pick<
      InterviewHistory,
      | "id"
      | "interviewStatus"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      InterviewHistory,
      | "id"
      | "interviewStatus"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "interviewHistory.view"
  ? Pick<
      InterviewHistory,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "interviewStatus"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "interview"
    >
  : never;
