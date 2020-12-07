import { AbstractParentEntity } from "./AbstractParentEntity";
export class MessageTemplate extends AbstractParentEntity {
  static NAME = "base$MessageTemplate";
  name?: string | null;
  code?: string | null;
  description?: string | null;
  type?: any | null;
  entity?: string | null;
  languageCode?: string | null;
  addressLang1?: string | null;
  addressLang2?: string | null;
  addressLang3?: string | null;
  addressLang4?: string | null;
  addressLang5?: string | null;
  messageHeaderLang1?: string | null;
  messageHeaderLang2?: string | null;
  messageHeaderLang3?: string | null;
  messageHeaderLang4?: string | null;
  messageHeaderLang5?: string | null;
  messageBodyLang1?: string | null;
  messageBodyLang2?: string | null;
  messageBodyLang3?: string | null;
  messageBodyLang4?: string | null;
  messageBodyLang5?: string | null;
  entityCaption?: string | null;
  fullName?: string | null;
  address?: string | null;
  messageHeader?: string | null;
  messageBody?: string | null;
}
export type MessageTemplateViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "messageTemplate.edit";
export type MessageTemplateView<
  V extends MessageTemplateViewName
> = V extends "_minimal"
  ? Pick<MessageTemplate, "id" | "fullName">
  : V extends "_local"
  ? Pick<
      MessageTemplate,
      | "id"
      | "name"
      | "code"
      | "description"
      | "type"
      | "entity"
      | "languageCode"
      | "addressLang1"
      | "addressLang2"
      | "addressLang3"
      | "addressLang4"
      | "addressLang5"
      | "messageHeaderLang1"
      | "messageHeaderLang2"
      | "messageHeaderLang3"
      | "messageHeaderLang4"
      | "messageHeaderLang5"
      | "messageBodyLang1"
      | "messageBodyLang2"
      | "messageBodyLang3"
      | "messageBodyLang4"
      | "messageBodyLang5"
      | "entityCaption"
      | "fullName"
      | "address"
      | "messageHeader"
      | "messageBody"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      MessageTemplate,
      | "id"
      | "fullName"
      | "name"
      | "code"
      | "description"
      | "type"
      | "entity"
      | "languageCode"
      | "addressLang1"
      | "addressLang2"
      | "addressLang3"
      | "addressLang4"
      | "addressLang5"
      | "messageHeaderLang1"
      | "messageHeaderLang2"
      | "messageHeaderLang3"
      | "messageHeaderLang4"
      | "messageHeaderLang5"
      | "messageBodyLang1"
      | "messageBodyLang2"
      | "messageBodyLang3"
      | "messageBodyLang4"
      | "messageBodyLang5"
      | "entityCaption"
      | "address"
      | "messageHeader"
      | "messageBody"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "messageTemplate.edit"
  ? Pick<
      MessageTemplate,
      | "id"
      | "name"
      | "code"
      | "description"
      | "type"
      | "entity"
      | "languageCode"
      | "addressLang1"
      | "addressLang2"
      | "addressLang3"
      | "addressLang4"
      | "addressLang5"
      | "messageHeaderLang1"
      | "messageHeaderLang2"
      | "messageHeaderLang3"
      | "messageHeaderLang4"
      | "messageHeaderLang5"
      | "messageBodyLang1"
      | "messageBodyLang2"
      | "messageBodyLang3"
      | "messageBodyLang4"
      | "messageBodyLang5"
      | "entityCaption"
      | "fullName"
      | "address"
      | "messageHeader"
      | "messageBody"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "entityCaption"
    >
  : never;
