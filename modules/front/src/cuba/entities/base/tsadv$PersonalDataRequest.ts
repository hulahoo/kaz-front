import { AbstractBprocRequest } from "./AbstractBprocRequest";
import { DicMaritalStatus } from "./tsadv$DicMaritalStatus";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { FileDescriptor } from "./sys$FileDescriptor";
import { DicNationality } from "./tsadv$DicNationality";
import { DicCitizenship } from "./tsadv$DicCitizenship";
export class PersonalDataRequest extends AbstractBprocRequest {
  static NAME = "tsadv$PersonalDataRequest";
  lastName?: string | null;
  firstName?: string | null;
  middleName?: string | null;
  lastNameLatin?: string | null;
  firstNameLatin?: string | null;
  middleNameLatin?: string | null;
  maritalStatus?: DicMaritalStatus | null;
  dateOfBirth?: any | null;
  personGroup?: PersonGroupExt | null;
  attachments?: FileDescriptor[] | null;
  nationality?: DicNationality | null;
  citizenship?: DicCitizenship | null;
  nationalIdentifier?: string | null;
}
export type PersonalDataRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "personalDataRequest-edit"
  | "personalDataRequest-for-integration"
  | "personalDataRequest-view"
  | "portal.my-profile";
export type PersonalDataRequestView<
  V extends PersonalDataRequestViewName
> = V extends "_base"
  ? Pick<
      PersonalDataRequest,
      | "id"
      | "personGroup"
      | "lastName"
      | "firstName"
      | "middleName"
      | "lastNameLatin"
      | "firstNameLatin"
      | "middleNameLatin"
      | "dateOfBirth"
      | "nationalIdentifier"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
    >
  : V extends "_local"
  ? Pick<
      PersonalDataRequest,
      | "id"
      | "lastName"
      | "firstName"
      | "middleName"
      | "lastNameLatin"
      | "firstNameLatin"
      | "middleNameLatin"
      | "dateOfBirth"
      | "nationalIdentifier"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
    >
  : V extends "_minimal"
  ? Pick<PersonalDataRequest, "id" | "personGroup">
  : V extends "personalDataRequest-edit"
  ? Pick<
      PersonalDataRequest,
      | "id"
      | "lastName"
      | "firstName"
      | "middleName"
      | "lastNameLatin"
      | "firstNameLatin"
      | "middleNameLatin"
      | "dateOfBirth"
      | "nationalIdentifier"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
      | "status"
      | "personGroup"
      | "nationality"
      | "citizenship"
      | "attachments"
    >
  : V extends "personalDataRequest-for-integration"
  ? Pick<
      PersonalDataRequest,
      | "id"
      | "lastName"
      | "firstName"
      | "middleName"
      | "lastNameLatin"
      | "firstNameLatin"
      | "middleNameLatin"
      | "dateOfBirth"
      | "nationalIdentifier"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
      | "maritalStatus"
      | "personGroup"
      | "nationality"
      | "citizenship"
      | "status"
    >
  : V extends "personalDataRequest-view"
  ? Pick<
      PersonalDataRequest,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "lastName"
      | "firstName"
      | "middleName"
      | "lastNameLatin"
      | "firstNameLatin"
      | "middleNameLatin"
      | "dateOfBirth"
      | "nationalIdentifier"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
      | "maritalStatus"
      | "status"
      | "personGroup"
      | "attachments"
    >
  : V extends "portal.my-profile"
  ? Pick<
      PersonalDataRequest,
      | "id"
      | "lastName"
      | "firstName"
      | "middleName"
      | "lastNameLatin"
      | "firstNameLatin"
      | "middleNameLatin"
      | "dateOfBirth"
      | "nationalIdentifier"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
      | "status"
      | "attachments"
      | "personGroup"
    >
  : never;
