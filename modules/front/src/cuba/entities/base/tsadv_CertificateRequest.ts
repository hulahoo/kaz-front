import { AbstractBprocRequest } from "./AbstractBprocRequest";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicCertificateType } from "./tsadv_DicCertificateType";
import { DicReceivingType } from "./tsadv_DicReceivingType";
import { DicLanguage } from "./tsadv$DicLanguage";
import { FileDescriptor } from "./sys$FileDescriptor";
export class CertificateRequest extends AbstractBprocRequest {
  static NAME = "tsadv_CertificateRequest";
  personGroup?: PersonGroupExt | null;
  certificateType?: DicCertificateType | null;
  receivingType?: DicReceivingType | null;
  language?: DicLanguage | null;
  showSalary?: boolean | null;
  numberOfCopy?: number | null;
  file?: FileDescriptor | null;
}
export type CertificateRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "certificateRequest-view"
  | "portal.certificateRequest-edit";
export type CertificateRequestView<
  V extends CertificateRequestViewName
> = V extends "_base"
  ? Pick<
      CertificateRequest,
      | "id"
      | "requestNumber"
      | "showSalary"
      | "numberOfCopy"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestDate"
      | "comment"
    >
  : V extends "_local"
  ? Pick<
      CertificateRequest,
      | "id"
      | "showSalary"
      | "numberOfCopy"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
    >
  : V extends "_minimal"
  ? Pick<CertificateRequest, "id" | "requestNumber">
  : V extends "certificateRequest-view"
  ? Pick<
      CertificateRequest,
      | "id"
      | "showSalary"
      | "numberOfCopy"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
      | "personGroup"
      | "status"
      | "receivingType"
      | "file"
      | "language"
      | "certificateType"
    >
  : V extends "portal.certificateRequest-edit"
  ? Pick<
      CertificateRequest,
      | "id"
      | "showSalary"
      | "numberOfCopy"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
      | "personGroup"
      | "status"
      | "receivingType"
      | "file"
      | "language"
      | "certificateType"
    >
  : never;
