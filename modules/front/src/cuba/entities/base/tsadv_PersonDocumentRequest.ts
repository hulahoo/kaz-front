import {DicIssuingAuthority} from "./tsadv_DicIssuingAuthority";
import {DicDocumentType} from "./tsadv$DicDocumentType";
import {PersonGroupExt} from "./base$PersonGroupExt";
import {DicApprovalStatus} from "./tsadv$DicApprovalStatus";
import {FileDescriptor} from "./sys$FileDescriptor";
import {PersonDocument} from "./tsadv$PersonDocument";
import {AbstractBprocRequest} from "./AbstractBprocRequest";

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
  approvalStatus?: DicApprovalStatus | null;
  editedPersonDocument?: PersonDocument | null;
  attachments?: FileDescriptor[] | null;
}
export type PersonDocumentRequestViewName = "_base" | "_local" | "_minimal";
export type PersonDocumentRequestView<
  V extends PersonDocumentRequestViewName
> = V extends "_base"
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
    >
  : never;
