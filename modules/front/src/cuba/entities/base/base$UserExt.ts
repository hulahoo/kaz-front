import { User } from "./sec$User";
import { FileDescriptor } from "./sys$FileDescriptor";
import { UserEmailSettings } from "./base$UserEmailSettings";
import { AddressBook } from "./base$AddressBook";
export class UserExt extends User {
  static NAME = "base$UserExt";
  image?: FileDescriptor | null;
  atsCode?: string | null;
  innerNumber?: string | null;
  availability?: boolean | null;
  mobilePhone?: string | null;
  telegramCode?: string | null;
  telegramChatId?: string | null;
  emailSettings?: UserEmailSettings[] | null;
  addressBookEntries?: AddressBook[] | null;
  passwordChangeDate?: any | null;
  shortName?: string | null;
  fullName?: string | null;
}
export type UserExtViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "user.browse"
  | "user.edit"
  | "user.receiveAndSendEmails";
export type UserExtView<V extends UserExtViewName> = V extends "_base"
  ? Pick<
      UserExt,
      | "id"
      | "shortName"
      | "atsCode"
      | "innerNumber"
      | "availability"
      | "mobilePhone"
      | "telegramCode"
      | "telegramChatId"
      | "passwordChangeDate"
      | "fullName"
      | "login"
      | "loginLowerCase"
      | "password"
      | "passwordEncryption"
      | "name"
      | "firstName"
      | "lastName"
      | "middleName"
      | "position"
      | "email"
      | "language"
      | "timeZone"
      | "timeZoneAuto"
      | "active"
      | "changePasswordAtNextLogon"
      | "groupNames"
      | "ipMask"
      | "sysTenantId"
    >
  : V extends "_local"
  ? Pick<
      UserExt,
      | "id"
      | "atsCode"
      | "innerNumber"
      | "availability"
      | "mobilePhone"
      | "telegramCode"
      | "telegramChatId"
      | "passwordChangeDate"
      | "shortName"
      | "fullName"
      | "login"
      | "loginLowerCase"
      | "password"
      | "passwordEncryption"
      | "name"
      | "firstName"
      | "lastName"
      | "middleName"
      | "position"
      | "email"
      | "language"
      | "timeZone"
      | "timeZoneAuto"
      | "active"
      | "changePasswordAtNextLogon"
      | "groupNames"
      | "ipMask"
      | "sysTenantId"
    >
  : V extends "_minimal"
  ? Pick<UserExt, "id" | "shortName">
  : V extends "user.browse"
  ? Pick<
      UserExt,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "login"
      | "loginLowerCase"
      | "password"
      | "passwordEncryption"
      | "name"
      | "firstName"
      | "lastName"
      | "middleName"
      | "position"
      | "email"
      | "language"
      | "timeZone"
      | "timeZoneAuto"
      | "active"
      | "changePasswordAtNextLogon"
      | "groupNames"
      | "ipMask"
      | "sysTenantId"
      | "group"
      | "image"
    >
  : V extends "user.edit"
  ? Pick<
      UserExt,
      | "id"
      | "login"
      | "loginLowerCase"
      | "password"
      | "passwordEncryption"
      | "name"
      | "firstName"
      | "lastName"
      | "middleName"
      | "position"
      | "email"
      | "language"
      | "timeZone"
      | "timeZoneAuto"
      | "active"
      | "changePasswordAtNextLogon"
      | "groupNames"
      | "ipMask"
      | "sysTenantId"
      | "group"
      | "userRoles"
      | "substitutions"
      | "image"
      | "addressBookEntries"
      | "availability"
      | "innerNumber"
      | "atsCode"
    >
  : V extends "user.receiveAndSendEmails"
  ? Pick<UserExt, "id" | "shortName" | "emailSettings" | "email">
  : never;
