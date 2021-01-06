import { AbstractParentEntity } from "./AbstractParentEntity";
import { Requisition } from "./tsadv$Requisition";
import { DicSource } from "./tsadv$DicSource";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { Interview } from "./tsadv$Interview";
import { DicJobRequestReason } from "./tsadv$DicJobRequestReason";
import { FileDescriptor } from "./sys$FileDescriptor";
import { UserExtJobRequestSeting } from "./tsadv$UserExtJobRequestSeting";
export class JobRequest extends AbstractParentEntity {
  static NAME = "tsadv$JobRequest";
  requisition?: Requisition | null;
  source?: DicSource | null;
  otherSource?: string | null;
  candidatePersonGroup?: PersonGroupExt | null;
  requestDate?: any | null;
  requestStatus?: any | null;
  competenceMatchPercent?: any | null;
  questionnaireMatchPercent?: any | null;
  passedInterviews?: number | null;
  totalInterviews?: number | null;
  interviews?: Interview[] | null;
  interview?: Interview | null;
  jobRequestReason?: DicJobRequestReason | null;
  reason?: string | null;
  videoFile?: FileDescriptor | null;
  viewLater?: boolean | null;
  viewLaters?: UserExtJobRequestSeting[] | null;
  isReserved?: boolean | null;
  competenceMatchString?: string | null;
  selectedByManager?: boolean | null;
  sent?: boolean | null;
  name?: string | null;
}
export type JobRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "for-jobrequest-count"
  | "jobRequest-for-count"
  | "jobRequest-for-filter"
  | "jobRequest-for-new"
  | "jobRequest-status-edit"
  | "jobRequest-view"
  | "jobRequest.card"
  | "jobRequest.full"
  | "jobRequest.listener.view"
  | "jobRequest.view"
  | "requisition-browsefor-groupinterview";
export type JobRequestView<V extends JobRequestViewName> = V extends "_base"
  ? Pick<
      JobRequest,
      | "id"
      | "otherSource"
      | "requestDate"
      | "requestStatus"
      | "reason"
      | "isReserved"
      | "selectedByManager"
      | "sent"
      | "name"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      JobRequest,
      | "id"
      | "otherSource"
      | "requestDate"
      | "requestStatus"
      | "reason"
      | "isReserved"
      | "selectedByManager"
      | "sent"
      | "name"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<JobRequest, "id">
  : V extends "for-jobrequest-count"
  ? Pick<
      JobRequest,
      | "id"
      | "otherSource"
      | "requestDate"
      | "requestStatus"
      | "reason"
      | "isReserved"
      | "selectedByManager"
      | "sent"
      | "name"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "candidatePersonGroup"
    >
  : V extends "jobRequest-for-count"
  ? Pick<
      JobRequest,
      | "id"
      | "otherSource"
      | "requestDate"
      | "requestStatus"
      | "reason"
      | "isReserved"
      | "selectedByManager"
      | "sent"
      | "name"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requisition"
      | "candidatePersonGroup"
    >
  : V extends "jobRequest-for-filter"
  ? Pick<JobRequest, "id" | "requestStatus">
  : V extends "jobRequest-for-new"
  ? Pick<
      JobRequest,
      | "id"
      | "otherSource"
      | "requestDate"
      | "requestStatus"
      | "reason"
      | "isReserved"
      | "selectedByManager"
      | "sent"
      | "name"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "candidatePersonGroup"
      | "interviews"
      | "requisition"
    >
  : V extends "jobRequest-status-edit"
  ? Pick<JobRequest, "id" | "requestStatus">
  : V extends "jobRequest-view"
  ? Pick<
      JobRequest,
      | "id"
      | "otherSource"
      | "requestDate"
      | "requestStatus"
      | "reason"
      | "isReserved"
      | "selectedByManager"
      | "sent"
      | "name"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "candidatePersonGroup"
      | "interviews"
      | "interview"
    >
  : V extends "jobRequest.card"
  ? Pick<
      JobRequest,
      | "id"
      | "otherSource"
      | "requestDate"
      | "requestStatus"
      | "reason"
      | "isReserved"
      | "selectedByManager"
      | "sent"
      | "name"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requisition"
      | "candidatePersonGroup"
      | "interviews"
      | "jobRequestReason"
      | "videoFile"
      | "viewLaters"
      | "source"
      | "createdBy"
      | "viewLater"
      | "name"
      | "requisition"
    >
  : V extends "jobRequest.full"
  ? Pick<
      JobRequest,
      | "id"
      | "otherSource"
      | "requestDate"
      | "requestStatus"
      | "reason"
      | "isReserved"
      | "selectedByManager"
      | "sent"
      | "name"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "candidatePersonGroup"
      | "jobRequestReason"
      | "videoFile"
      | "requisition"
    >
  : V extends "jobRequest.listener.view"
  ? Pick<
      JobRequest,
      | "id"
      | "otherSource"
      | "requestDate"
      | "requestStatus"
      | "reason"
      | "isReserved"
      | "selectedByManager"
      | "sent"
      | "name"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requisition"
      | "candidatePersonGroup"
      | "interviews"
      | "jobRequestReason"
      | "videoFile"
      | "viewLaters"
      | "source"
      | "createdBy"
      | "createTs"
      | "updateTs"
      | "updatedBy"
    >
  : V extends "jobRequest.view"
  ? Pick<
      JobRequest,
      | "id"
      | "otherSource"
      | "requestDate"
      | "requestStatus"
      | "reason"
      | "isReserved"
      | "selectedByManager"
      | "sent"
      | "name"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requisition"
      | "candidatePersonGroup"
      | "interviews"
      | "jobRequestReason"
      | "videoFile"
      | "viewLaters"
      | "source"
      | "createdBy"
    >
  : V extends "requisition-browsefor-groupinterview"
  ? Pick<
      JobRequest,
      | "id"
      | "requisition"
      | "candidatePersonGroup"
      | "interviews"
      | "requestDate"
      | "requestStatus"
    >
  : never;
