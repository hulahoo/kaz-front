import { AbstractParentEntity } from "./AbstractParentEntity";
import { NotificationRecipient } from "./base$NotificationRecipient";
import { SendingNotification } from "./base$SendingNotification";
export class NotificationTemplate extends AbstractParentEntity {
  static NAME = "base$NotificationTemplate";
  code?: string | null;
  description?: string | null;
  name?: string | null;
  sqlQuery?: string | null;
  emailCaption?: string | null;
  emailTemplate?: string | null;
  smsTemplate?: string | null;
  telegramTemplate?: string | null;
  recipients?: NotificationRecipient[] | null;
  notifications?: SendingNotification[] | null;
  notificationType?: any | null;
  emailCaptionLang1?: string | null;
  emailCaptionLang2?: string | null;
  emailCaptionLang3?: string | null;
  emailCaptionLang4?: string | null;
  emailCaptionLang5?: string | null;
  emailTemplateLang1?: string | null;
  emailTemplateLang2?: string | null;
  emailTemplateLang3?: string | null;
  emailTemplateLang4?: string | null;
  emailTemplateLang5?: string | null;
  smsTemplateLang1?: string | null;
  smsTemplateLang2?: string | null;
  smsTemplateLang3?: string | null;
  smsTemplateLang4?: string | null;
  smsTemplateLang5?: string | null;
  telegramTemplateLang1?: string | null;
  telegramTemplateLang2?: string | null;
  telegramTemplateLang3?: string | null;
  telegramTemplateLang4?: string | null;
  telegramTemplateLang5?: string | null;
}
export type NotificationTemplateViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "notificationTemplate.view";
export type NotificationTemplateView<
  V extends NotificationTemplateViewName
> = V extends "_minimal"
  ? Pick<NotificationTemplate, "id" | "name">
  : V extends "_local"
  ? Pick<
      NotificationTemplate,
      | "id"
      | "code"
      | "description"
      | "name"
      | "sqlQuery"
      | "emailCaption"
      | "emailTemplate"
      | "smsTemplate"
      | "telegramTemplate"
      | "notificationType"
      | "emailCaptionLang1"
      | "emailCaptionLang2"
      | "emailCaptionLang3"
      | "emailCaptionLang4"
      | "emailCaptionLang5"
      | "emailTemplateLang1"
      | "emailTemplateLang2"
      | "emailTemplateLang3"
      | "emailTemplateLang4"
      | "emailTemplateLang5"
      | "smsTemplateLang1"
      | "smsTemplateLang2"
      | "smsTemplateLang3"
      | "smsTemplateLang4"
      | "smsTemplateLang5"
      | "telegramTemplateLang1"
      | "telegramTemplateLang2"
      | "telegramTemplateLang3"
      | "telegramTemplateLang4"
      | "telegramTemplateLang5"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      NotificationTemplate,
      | "id"
      | "name"
      | "code"
      | "description"
      | "sqlQuery"
      | "emailCaption"
      | "emailTemplate"
      | "smsTemplate"
      | "telegramTemplate"
      | "notificationType"
      | "emailCaptionLang1"
      | "emailCaptionLang2"
      | "emailCaptionLang3"
      | "emailCaptionLang4"
      | "emailCaptionLang5"
      | "emailTemplateLang1"
      | "emailTemplateLang2"
      | "emailTemplateLang3"
      | "emailTemplateLang4"
      | "emailTemplateLang5"
      | "smsTemplateLang1"
      | "smsTemplateLang2"
      | "smsTemplateLang3"
      | "smsTemplateLang4"
      | "smsTemplateLang5"
      | "telegramTemplateLang1"
      | "telegramTemplateLang2"
      | "telegramTemplateLang3"
      | "telegramTemplateLang4"
      | "telegramTemplateLang5"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "notificationTemplate.view"
  ? Pick<
      NotificationTemplate,
      | "id"
      | "code"
      | "description"
      | "name"
      | "sqlQuery"
      | "emailCaption"
      | "emailTemplate"
      | "smsTemplate"
      | "telegramTemplate"
      | "notificationType"
      | "emailCaptionLang1"
      | "emailCaptionLang2"
      | "emailCaptionLang3"
      | "emailCaptionLang4"
      | "emailCaptionLang5"
      | "emailTemplateLang1"
      | "emailTemplateLang2"
      | "emailTemplateLang3"
      | "emailTemplateLang4"
      | "emailTemplateLang5"
      | "smsTemplateLang1"
      | "smsTemplateLang2"
      | "smsTemplateLang3"
      | "smsTemplateLang4"
      | "smsTemplateLang5"
      | "telegramTemplateLang1"
      | "telegramTemplateLang2"
      | "telegramTemplateLang3"
      | "telegramTemplateLang4"
      | "telegramTemplateLang5"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "recipients"
    >
  : never;
