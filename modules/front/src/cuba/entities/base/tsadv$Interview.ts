import { AbstractParentEntity } from "./AbstractParentEntity";
import { JobRequest } from "./tsadv$JobRequest";
import { FileDescriptor } from "./sys$FileDescriptor";
import { RequisitionHiringStep } from "./tsadv$RequisitionHiringStep";
import { InterviewDetail } from "./tsadv$InterviewDetail";
import { InterviewQuestionnaire } from "./tsadv$InterviewQuestionnaire";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicInterviewReason } from "./tsadv$DicInterviewReason";
import { DicLocation } from "./base$DicLocation";
import { Requisition } from "./tsadv$Requisition";
export class Interview extends AbstractParentEntity {
  static NAME = "tsadv$Interview";
  jobRequest?: JobRequest | null;
  attachment?: FileDescriptor | null;
  requisitionHiringStep?: RequisitionHiringStep | null;
  interviewDate?: any | null;
  interviewStatus?: any | null;
  interviewDetails?: InterviewDetail[] | null;
  questionnaires?: InterviewQuestionnaire[] | null;
  mainInterviewerPersonGroup?: PersonGroupExt | null;
  timeFrom?: any | null;
  timeTo?: any | null;
  sendInvitationToCandidate?: boolean | null;
  interviewReason?: DicInterviewReason | null;
  reason?: string | null;
  place?: DicLocation | null;
  isScheduled?: boolean | null;
  requisition?: Requisition | null;
  maxCandidatesCount?: number | null;
  comment?: string | null;
  questionnaireMatchPercent?: any | null;
  isGroup?: boolean | null;
  groupInterview?: Interview | null;
  groupDraftCount?: number | null;
  groupOnApprovalCount?: number | null;
  groupPlannedCount?: number | null;
  groupCompletedCount?: number | null;
  groupFailedCount?: number | null;
  groupCancelledCount?: number | null;
  groupOnCancellationCount?: number | null;
}
export type InterviewViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "groupInterview.view"
  | "interview-for-jobrequest"
  | "interview-view-withquestianare"
  | "interview.full"
  | "interview.miniView"
  | "interview.view"
  | "scheduledInterview.view";
export type InterviewView<V extends InterviewViewName> = V extends "_base"
  ? Pick<
      Interview,
      | "id"
      | "interviewDate"
      | "interviewStatus"
      | "timeFrom"
      | "timeTo"
      | "sendInvitationToCandidate"
      | "reason"
      | "isScheduled"
      | "maxCandidatesCount"
      | "comment"
      | "isGroup"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Interview,
      | "id"
      | "interviewDate"
      | "interviewStatus"
      | "timeFrom"
      | "timeTo"
      | "sendInvitationToCandidate"
      | "reason"
      | "isScheduled"
      | "maxCandidatesCount"
      | "comment"
      | "isGroup"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<Interview, "id">
  : V extends "groupInterview.view"
  ? Pick<
      Interview,
      | "id"
      | "interviewDate"
      | "interviewStatus"
      | "timeFrom"
      | "timeTo"
      | "sendInvitationToCandidate"
      | "reason"
      | "isScheduled"
      | "maxCandidatesCount"
      | "comment"
      | "isGroup"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requisitionHiringStep"
      | "interviewDetails"
      | "questionnaires"
      | "mainInterviewerPersonGroup"
      | "place"
      | "requisition"
      | "jobRequest"
    >
  : V extends "interview-for-jobrequest"
  ? Pick<
      Interview,
      | "id"
      | "requisitionHiringStep"
      | "interviewStatus"
      | "interviewDate"
      | "timeFrom"
      | "timeTo"
      | "place"
      | "interviewReason"
      | "reason"
      | "comment"
      | "questionnaires"
      | "mainInterviewerPersonGroup"
    >
  : V extends "interview-view-withquestianare"
  ? Pick<
      Interview,
      | "id"
      | "jobRequest"
      | "interviewDate"
      | "interviewStatus"
      | "questionnaires"
      | "comment"
    >
  : V extends "interview.full"
  ? Pick<
      Interview,
      | "id"
      | "interviewDate"
      | "interviewStatus"
      | "timeFrom"
      | "timeTo"
      | "sendInvitationToCandidate"
      | "reason"
      | "isScheduled"
      | "maxCandidatesCount"
      | "comment"
      | "isGroup"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "jobRequest"
      | "requisitionHiringStep"
      | "mainInterviewerPersonGroup"
      | "interviewReason"
      | "requisition"
      | "place"
      | "groupInterview"
    >
  : V extends "interview.miniView"
  ? Pick<
      Interview,
      | "id"
      | "interviewDate"
      | "interviewStatus"
      | "timeFrom"
      | "timeTo"
      | "sendInvitationToCandidate"
      | "reason"
      | "isScheduled"
      | "maxCandidatesCount"
      | "comment"
      | "isGroup"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "jobRequest"
      | "requisitionHiringStep"
      | "interviewReason"
      | "place"
      | "groupInterview"
    >
  : V extends "interview.view"
  ? Pick<
      Interview,
      | "id"
      | "interviewDate"
      | "interviewStatus"
      | "timeFrom"
      | "timeTo"
      | "sendInvitationToCandidate"
      | "reason"
      | "isScheduled"
      | "maxCandidatesCount"
      | "comment"
      | "isGroup"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "jobRequest"
      | "requisitionHiringStep"
      | "interviewDetails"
      | "mainInterviewerPersonGroup"
      | "interviewReason"
      | "place"
      | "groupInterview"
      | "requisition"
      | "questionnaires"
      | "attachment"
    >
  : V extends "scheduledInterview.view"
  ? Pick<
      Interview,
      | "id"
      | "interviewDate"
      | "interviewStatus"
      | "timeFrom"
      | "timeTo"
      | "sendInvitationToCandidate"
      | "reason"
      | "isScheduled"
      | "maxCandidatesCount"
      | "comment"
      | "isGroup"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requisitionHiringStep"
      | "mainInterviewerPersonGroup"
      | "requisition"
      | "interviewDetails"
      | "place"
    >
  : never;
