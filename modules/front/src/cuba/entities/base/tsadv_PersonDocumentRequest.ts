import { AbstractBprocRequest } from "./AbstractBprocRequest";
import { DicIssuingAuthority } from "./tsadv_DicIssuingAuthority";
import { DicDocumentType } from "./tsadv$DicDocumentType";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { PersonDocument } from "./tsadv$PersonDocument";
import { DicApprovalStatus } from "./tsadv$DicApprovalStatus";
import { FileDescriptor } from "./sys$FileDescriptor";
export class PersonDocumentRequest extends AbstractBprocRequest {
  static NAME = "tsadv_PersonDocumentRequest";
  issueDate?: any | null;
  expiredDate?: any | null;
  issuedBy?: string | null;
  issuingAuthority?: DicIssuingAuthority | null;
  description?: string | null;
  documentType?: DicDocumentType | null;
  personGroup?: PersonGroupExt | null;
  documentNumber?: string | null;
  series?: string | null;
  editedPersonDocument?: PersonDocument | null;
  approvalStatus?: DicApprovalStatus | null;
  attachments?: FileDescriptor[] | null;
}
export type PersonDocumentRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "personDocumentRequest-for-integration"
  | "portal.my-profile";
export type PersonDocumentRequestView<
  V extends PersonDocumentRequestViewName
> = V extends "_base"
  ? Pick<
      PersonDocumentRequest,
      | "id"
      | "personGroup"
      | "documentType"
      | "issueDate"
      | "expiredDate"
      | "issuedBy"
      | "description"
      | "documentNumber"
      | "series"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
    >
  : V extends "_local"
  ? Pick<
      PersonDocumentRequest,
      | "id"
      | "issueDate"
      | "expiredDate"
      | "issuedBy"
      | "description"
      | "documentNumber"
      | "series"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
    >
  : V extends "_minimal"
  ? Pick<PersonDocumentRequest, "id" | "personGroup" | "documentType">
  : V extends "personDocumentRequest-for-integration"
  ? Pick<
      PersonDocumentRequest,
      | "id"
      | "issueDate"
      | "expiredDate"
      | "issuedBy"
      | "description"
      | "documentNumber"
      | "series"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
      | "issuingAuthority"
      | "documentType"
      | "personGroup"
      | "editedPersonDocument"
      | "attachments"
      | "status"
    >
  : V extends "portal.my-profile"
  ? Pick<
      PersonDocumentRequest,
      | "id"
      | "issueDate"
      | "expiredDate"
      | "issuedBy"
      | "description"
      | "documentNumber"
      | "series"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
      | "personGroup"
      | "issuingAuthority"
      | "documentType"
      | "attachments"
      | "status"
      | "editedPersonDocument"
    >
  : never;
