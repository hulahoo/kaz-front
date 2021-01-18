import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicMaritalStatus } from "./tsadv$DicMaritalStatus";
import { FileDescriptor } from "./sys$FileDescriptor";
import { DicRequestStatus } from "./tsadv$DicRequestStatus";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicNationality } from "./tsadv$DicNationality";
import { DicCitizenship } from "./tsadv$DicCitizenship";
export class PersonalDataRequest extends AbstractParentEntity {
  static NAME = "tsadv$PersonalDataRequest";
  lastName?: string | null;
  requestNumber?: any | null;
  firstName?: string | null;
  middleName?: string | null;
  lastNameLatin?: string | null;
  firstNameLatin?: string | null;
  middleNameLatin?: string | null;
  maritalStatus?: DicMaritalStatus | null;
  dateOfBirth?: any | null;
  attachment?: FileDescriptor | null;
  status?: DicRequestStatus | null;
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
  | "personalDataRequest-edit"
  | "personalDataRequest-view";
export type PersonalDataRequestView<
  V extends PersonalDataRequestViewName
> = V extends "_base"
  ? Pick<
      PersonalDataRequest,
      | "id"
      | "lastName"
      | "requestNumber"
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
    >
  : V extends "_local"
  ? Pick<
      PersonalDataRequest,
      | "id"
      | "lastName"
      | "requestNumber"
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
    >
  : V extends "personalDataRequest-edit"
  ? Pick<
      PersonalDataRequest,
      | "id"
      | "lastName"
      | "requestNumber"
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
      | "status"
      | "personGroup"
      | "nationality"
      | "citizenship"
      | "attachments"
    >
  : V extends "personalDataRequest-edit"
  ? Pick<
      PersonalDataRequest,
      | "id"
      | "lastName"
      | "requestNumber"
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
      | "status"
      | "personGroup"
      | "nationality"
      | "citizenship"
      | "attachments"
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
      | "requestNumber"
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
      | "maritalStatus"
      | "attachment"
      | "status"
      | "personGroup"
      | "attachments"
    >
  : never;
