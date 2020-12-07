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
  | "_minimal"
  | "_local"
  | "_base"
  | "_minimal"
  | "_local"
  | "_base"
  | "user.roles"
  | "user.edit"
  | "user.browse"
  | "user.receiveAndSendEmails";
export type UserExtView<V extends UserExtViewName> = V extends "_minimal"
  ? Pick<UserExt, "id" | "shortName">
  : V extends "_local"
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
      | "ipMask"
      | "atsCode"
      | "innerNumber"
      | "availability"
      | "mobilePhone"
      | "telegramCode"
      | "telegramChatId"
      | "passwordChangeDate"
      | "shortName"
      | "fullName"
    >
  : V extends "_base"
  ? Pick<
      UserExt,
      | "id"
      | "shortName"
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
      | "ipMask"
      | "atsCode"
      | "innerNumber"
      | "availability"
      | "mobilePhone"
      | "telegramCode"
      | "telegramChatId"
      | "passwordChangeDate"
      | "fullName"
    >
  : V extends "_minimal"
  ? Pick<UserExt, "id" | "shortName">
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
      | "ipMask"
    >
  : V extends "_base"
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
      | "ipMask"
    >
  : V extends "user.roles"
  ? Pick<UserExt, "id" | "shortName" | "userRoles">
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
      | "ipMask"
      | "group"
      | "userRoles"
      | "substitutions"
      | "image"
      | "addressBookEntries"
      | "availability"
      | "innerNumber"
      | "atsCode"
    >
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
      | "ipMask"
      | "group"
      | "image"
    >
  : V extends "user.receiveAndSendEmails"
  ? Pick<UserExt, "id" | "shortName" | "emailSettings" | "email">
  : never;
