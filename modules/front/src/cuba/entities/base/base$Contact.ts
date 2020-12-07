import { AbstractParty } from "./AbstractParty";
import { DicSex } from "./base$DicSex";
export class Contact extends AbstractParty {
  static NAME = "base$Contact";
  lastName?: string | null;
  firstName?: string | null;
  middleName?: string | null;
  nickName?: string | null;
  sex?: DicSex | null;
  dateOfBirth?: any | null;
  birthPlace?: string | null;
  upperLastName?: string | null;
  upperFirstName?: string | null;
  upperMiddleName?: string | null;
}
export type ContactViewName = "_minimal" | "_local" | "_base";
export type ContactView<V extends ContactViewName> = V extends "_minimal"
  ? Pick<Contact, "id" | "lastName" | "firstName">
  : V extends "_local"
  ? Pick<
      Contact,
      | "id"
      | "lastName"
      | "firstName"
      | "middleName"
      | "nickName"
      | "dateOfBirth"
      | "birthPlace"
      | "upperLastName"
      | "upperFirstName"
      | "upperMiddleName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      Contact,
      | "id"
      | "lastName"
      | "firstName"
      | "middleName"
      | "nickName"
      | "dateOfBirth"
      | "birthPlace"
      | "upperLastName"
      | "upperFirstName"
      | "upperMiddleName"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
