import { AbstractTimeBasedEntity } from "./AbstractTimeBasedEntity";
import { FileDescriptor } from "./sys$FileDescriptor";
import { DicSex } from "./base$DicSex";
export class Person extends AbstractTimeBasedEntity {
  static NAME = "base$Person";
  image?: FileDescriptor | null;
  firstName?: string | null;
  firstNameLatin?: string | null;
  middleNameLatin?: string | null;
  lastName?: string | null;
  lastNameLatin?: string | null;
  middleName?: string | null;
  hireDate?: any | null;
  nationalIdentifier?: string | null;
  dateOfBirth?: any | null;
  sex?: DicSex | null;
  employeeNumber?: string | null;
  fullName?: string | null;
  firstLastName?: string | null;
  shortName?: string | null;
  fioWithEmployeeNumber?: string | null;
  fullNameLatin?: string | null;
  fistLastNameLatin?: string | null;
}
export type PersonViewName = "_base" | "_local" | "_minimal";
export type PersonView<V extends PersonViewName> = V extends "_base"
  ? Pick<
      Person,
      | "id"
      | "lastName"
      | "firstName"
      | "middleName"
      | "employeeNumber"
      | "firstNameLatin"
      | "middleNameLatin"
      | "lastNameLatin"
      | "hireDate"
      | "nationalIdentifier"
      | "dateOfBirth"
      | "fullName"
      | "firstLastName"
      | "shortName"
      | "fioWithEmployeeNumber"
      | "fullNameLatin"
      | "fistLastNameLatin"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : V extends "_local"
  ? Pick<
      Person,
      | "id"
      | "firstName"
      | "firstNameLatin"
      | "middleNameLatin"
      | "lastName"
      | "lastNameLatin"
      | "middleName"
      | "hireDate"
      | "nationalIdentifier"
      | "dateOfBirth"
      | "employeeNumber"
      | "fullName"
      | "firstLastName"
      | "shortName"
      | "fioWithEmployeeNumber"
      | "fullNameLatin"
      | "fistLastNameLatin"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "startDate"
      | "endDate"
      | "writeHistory"
    >
  : V extends "_minimal"
  ? Pick<
      Person,
      "id" | "lastName" | "firstName" | "middleName" | "employeeNumber"
    >
  : never;
