import { StandardEntity } from "./sys$StandardEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicCertificateType } from "./tsadv_DicCertificateType";
import { DicReceivingType } from "./tsadv_DicReceivingType";
import { DicLanguage } from "./tsadv$DicLanguage";
import { FileDescriptor } from "./sys$FileDescriptor";
import { AbsenceRequestStatus } from "./tsadv_AbsenceRequestStatus";
export class CertificateRequest extends StandardEntity {
  static NAME = "tsadv_CertificateRequest";
  requestNumber?: any | null;
  requestDate?: any | null;
  personGroup?: PersonGroupExt | null;
  cretificateType?: DicCertificateType | null;
  receivingType?: DicReceivingType | null;
  language?: DicLanguage | null;
  showSalary?: boolean | null;
  numberOfCopy?: number | null;
  file?: FileDescriptor | null;
  status?: AbsenceRequestStatus | null;
}
export type CertificateRequestViewName = "_base" | "_local" | "_minimal";
export type CertificateRequestView<
  V extends CertificateRequestViewName
> = V extends "_base"
  ? Pick<
      CertificateRequest,
      "id" | "requestNumber" | "requestDate" | "showSalary" | "numberOfCopy"
    >
  : V extends "_local"
  ? Pick<
      CertificateRequest,
      "id" | "requestNumber" | "requestDate" | "showSalary" | "numberOfCopy"
    >
  : never;
