import { AbstractParentEntity } from "./AbstractParentEntity";
export class SendingTelegram extends AbstractParentEntity {
  static NAME = "base$SendingTelegram";
  chatId?: string | null;
  text?: string | null;
  status?: any | null;
  dateSent?: any | null;
  attemptsCount?: number | null;
  attemptsMade?: number | null;
  deadline?: any | null;
}
export type SendingTelegramViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "sendingTelegram.view";
export type SendingTelegramView<
  V extends SendingTelegramViewName
> = V extends "_base"
  ? Pick<
      SendingTelegram,
      | "id"
      | "chatId"
      | "dateSent"
      | "text"
      | "status"
      | "attemptsCount"
      | "attemptsMade"
      | "deadline"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      SendingTelegram,
      | "id"
      | "chatId"
      | "text"
      | "status"
      | "dateSent"
      | "attemptsCount"
      | "attemptsMade"
      | "deadline"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<SendingTelegram, "id" | "chatId" | "dateSent">
  : V extends "sendingTelegram.view"
  ? Pick<
      SendingTelegram,
      | "id"
      | "chatId"
      | "text"
      | "status"
      | "dateSent"
      | "attemptsCount"
      | "attemptsMade"
      | "deadline"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
