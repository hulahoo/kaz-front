import { StandardEntity } from "./sys$StandardEntity";
import { DicMaritalStatus } from "./tsadv$DicMaritalStatus";
import { FileDescriptor } from "./sys$FileDescriptor";
import { DicRequestStatus } from "./tsadv$DicRequestStatus";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class PersonalDataRequest extends StandardEntity {
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
}
export type PersonalDataRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
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
      | "maritalStatus"
      | "attachment"
      | "status"
      | "personGroup"
      | "attachments"
    >
  : never;
