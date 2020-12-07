import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicDocumentType } from "./tsadv$DicDocumentType";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicApprovalStatus } from "./tsadv$DicApprovalStatus";
import { FileDescriptor } from "./sys$FileDescriptor";
export class PersonDocument extends AbstractParentEntity {
  static NAME = "tsadv$PersonDocument";
  issueDate?: any | null;
  expiredDate?: any | null;
  issuedBy?: string | null;
  description?: string | null;
  documentType?: DicDocumentType | null;
  personGroup?: PersonGroupExt | null;
  documentNumber?: string | null;
  series?: string | null;
  status?: DicApprovalStatus | null;
  file?: FileDescriptor | null;
}
export type PersonDocumentViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "personDocument.edit"
  | "personDocument.full"
  | "personDocument.card"
  | "personDocument.forNotification";
export type PersonDocumentView<
  V extends PersonDocumentViewName
> = V extends "_local"
  ? Pick<
      PersonDocument,
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
  : V extends "_base"
  ? Pick<
      PersonDocument,
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
  : V extends "personDocument.edit"
  ? Pick<
      PersonDocument,
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
      | "documentType"
      | "status"
      | "file"
      | "personGroup"
    >
  : V extends "personDocument.full"
  ? Pick<
      PersonDocument,
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
      | "documentType"
      | "personGroup"
      | "status"
    >
  : V extends "personDocument.card"
  ? Pick<
      PersonDocument,
      | "id"
      | "issueDate"
      | "expiredDate"
      | "issuedBy"
      | "description"
      | "documentType"
      | "documentNumber"
      | "series"
    >
  : V extends "personDocument.forNotification"
  ? Pick<
      PersonDocument,
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
      | "documentType"
      | "personGroup"
      | "status"
    >
  : never;
