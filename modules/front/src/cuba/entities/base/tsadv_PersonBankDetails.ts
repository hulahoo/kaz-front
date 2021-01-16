import { AbstractParentEntity } from "./AbstractParentEntity";
import { Bank } from "./base$Bank";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class PersonBankDetails extends AbstractParentEntity {
  static NAME = "tsadv_PersonBankDetails";
  bank?: Bank | null;
  fullNameBankCard?: string | null;
  iban?: string | null;
  bicBank?: string | null;
  personGroup?: PersonGroupExt | null;
  startDateHistory?: any | null;
  endDateHistory?: any | null;
}
export type PersonBankDetailsViewName = "_base" | "_local" | "_minimal";
export type PersonBankDetailsView<
  V extends PersonBankDetailsViewName
> = V extends "_base"
  ? Pick<
      PersonBankDetails,
      | "id"
      | "fullNameBankCard"
      | "iban"
      | "bicBank"
      | "startDateHistory"
      | "endDateHistory"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PersonBankDetails,
      | "id"
      | "fullNameBankCard"
      | "iban"
      | "bicBank"
      | "startDateHistory"
      | "endDateHistory"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
