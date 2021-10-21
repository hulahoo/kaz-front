import { StandardEntity } from "./sys$StandardEntity";
import { UserExt } from "./base$UserExt";
export class UserEmailSettings extends StandardEntity {
  static NAME = "base$UserEmailSettings";
  user?: UserExt | null;
  email?: string | null;
  password?: string | null;
  leaveMessageCopyOnServer?: boolean | null;
}
export type UserEmailSettingsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "userEmailSettings.edit";
export type UserEmailSettingsView<
  V extends UserEmailSettingsViewName
> = V extends "_base"
  ? Pick<
      UserEmailSettings,
      "id" | "email" | "password" | "leaveMessageCopyOnServer"
    >
  : V extends "_local"
  ? Pick<
      UserEmailSettings,
      "id" | "email" | "password" | "leaveMessageCopyOnServer"
    >
  : V extends "_minimal"
  ? Pick<UserEmailSettings, "id" | "email">
  : V extends "userEmailSettings.edit"
  ? Pick<
      UserEmailSettings,
      "id" | "email" | "password" | "leaveMessageCopyOnServer" | "user"
    >
  : never;
