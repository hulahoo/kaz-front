import { AbstractParentEntity } from "./AbstractParentEntity";
import { NotificationTemplate } from "./base$NotificationTemplate";
import { UserExt } from "./base$UserExt";
export class NotificationRecipient extends AbstractParentEntity {
  static NAME = "base$NotificationRecipient";
  template?: NotificationTemplate | null;
  user?: UserExt | null;
  sqlQuery?: string | null;
}
export type NotificationRecipientViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "notificationRecipient.view";
export type NotificationRecipientView<
  V extends NotificationRecipientViewName
> = V extends "_minimal"
  ? Pick<NotificationRecipient, "id">
  : V extends "_local"
  ? Pick<
      NotificationRecipient,
      | "id"
      | "sqlQuery"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      NotificationRecipient,
      | "id"
      | "sqlQuery"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "notificationRecipient.view"
  ? Pick<
      NotificationRecipient,
      | "id"
      | "sqlQuery"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "template"
      | "user"
    >
  : never;
