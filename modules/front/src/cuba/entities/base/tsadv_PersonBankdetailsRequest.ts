import { AbstractParentEntity } from "./AbstractParentEntity";
import { Bank } from "./base$Bank";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicRequestStatus } from "./tsadv$DicRequestStatus";
import { FileDescriptor } from "./sys$FileDescriptor";
import { PersonBankDetails } from "./tsadv_PersonBankDetails";
export class PersonBankdetailsRequest extends AbstractParentEntity {
  static NAME = "tsadv_PersonBankdetailsRequest";
  bank?: Bank | null;
  fullNameBankCard?: string | null;
  iban?: string | null;
  bicBank?: string | null;
  personGroup?: PersonGroupExt | null;
  requestStatus?: DicRequestStatus | null;
  file?: FileDescriptor | null;
  bankDetails?: PersonBankDetails | null;
}
export type PersonBankdetailsRequestViewName = "_base" | "_local" | "_minimal";
export type PersonBankdetailsRequestView<
  V extends PersonBankdetailsRequestViewName
> = V extends "_base"
  ? Pick<
      PersonBankdetailsRequest,
      | "id"
      | "fullNameBankCard"
      | "iban"
      | "bicBank"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PersonBankdetailsRequest,
      | "id"
      | "fullNameBankCard"
      | "iban"
      | "bicBank"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
