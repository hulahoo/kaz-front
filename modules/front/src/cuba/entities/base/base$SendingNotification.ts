import { AbstractParentEntity } from "./AbstractParentEntity";
import { NotificationTemplate } from "./base$NotificationTemplate";
import { NotificationRecipient } from "./base$NotificationRecipient";
import { UserExt } from "./base$UserExt";
import { SendingSms } from "./base$SendingSms";
import { SendingTelegram } from "./base$SendingTelegram";
import { SendingMessage } from "./sys$SendingMessage";
export class SendingNotification extends AbstractParentEntity {
  static NAME = "base$SendingNotification";
  template?: NotificationTemplate | null;
  recipient?: NotificationRecipient | null;
  user?: UserExt | null;
  sendingSms?: SendingSms | null;
  sendingTelegram?: SendingTelegram | null;
  sendingMessage?: SendingMessage | null;
  readed?: boolean | null;
  sendDate?: any | null;
}
export type SendingNotificationViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "notifications.lmsp"
  | "sendingNotification.view"
  | "sendingNotification.check.def";
export type SendingNotificationView<
  V extends SendingNotificationViewName
> = V extends "_minimal"
  ? Pick<SendingNotification, "id">
  : V extends "_local"
  ? Pick<
      SendingNotification,
      | "id"
      | "readed"
      | "sendDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      SendingNotification,
      | "id"
      | "readed"
      | "sendDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "notifications.lmsp"
  ? Pick<SendingNotification, "id" | "sendingMessage" | "createTs" | "readed">
  : V extends "sendingNotification.view"
  ? Pick<
      SendingNotification,
      | "id"
      | "readed"
      | "sendDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "template"
      | "recipient"
      | "user"
      | "sendingSms"
      | "sendingMessage"
      | "createTs"
    >
  : V extends "sendingNotification.check.def"
  ? Pick<
      SendingNotification,
      | "id"
      | "readed"
      | "sendDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "sendingSms"
      | "sendingMessage"
      | "createTs"
    >
  : never;
