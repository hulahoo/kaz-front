import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicRetirementType } from "./tsadv$DicRetirementType";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { Retirement } from "./tsadv$Retirement";
import { FileDescriptor } from "./sys$FileDescriptor";
import { DicRequestStatus } from "./tsadv$DicRequestStatus";
export class RetirementRequest extends AbstractParentEntity {
  static NAME = "tsadv_RetirementRequest";
  retirementType?: DicRetirementType | null;
  isseuDocDate?: any | null;
  documentNumber?: string | null;
  dateFrom?: any | null;
  dateTo?: any | null;
  personGroupExt?: PersonGroupExt | null;
  retirement?: Retirement | null;
  file?: FileDescriptor | null;
  requestStatus?: DicRequestStatus | null;
}
export type RetirementRequestViewName = "_base" | "_local" | "_minimal";
export type RetirementRequestView<
  V extends RetirementRequestViewName
> = V extends "_base"
  ? Pick<
      RetirementRequest,
      | "id"
      | "isseuDocDate"
      | "documentNumber"
      | "dateFrom"
      | "dateTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      RetirementRequest,
      | "id"
      | "isseuDocDate"
      | "documentNumber"
      | "dateFrom"
      | "dateTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
