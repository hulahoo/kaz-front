import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicIssuingAuthority } from "./tsadv_DicIssuingAuthority";
import { DicDocumentType } from "./tsadv$DicDocumentType";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicApprovalStatus } from "./tsadv$DicApprovalStatus";
import { FileDescriptor } from "./sys$FileDescriptor";
import { DicRequestStatus } from "./tsadv$DicRequestStatus";
import { PersonDocument } from "./tsadv$PersonDocument";
export class PersonDocumentRequest extends AbstractParentEntity {
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
  status?: DicApprovalStatus | null;
  file?: FileDescriptor | null;
  requestStatus?: DicRequestStatus | null;
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
