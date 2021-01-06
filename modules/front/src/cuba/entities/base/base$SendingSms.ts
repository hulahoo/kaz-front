import { AbstractParentEntity } from "./AbstractParentEntity";
export class SendingSms extends AbstractParentEntity {
  static NAME = "base$SendingSms";
  phoneNumber?: string | null;
  text?: string | null;
  status?: any | null;
  dateSent?: any | null;
  attemptsCount?: number | null;
  attemptsMade?: number | null;
  deadline?: any | null;
}
export type SendingSmsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "sendingSms.view";
export type SendingSmsView<V extends SendingSmsViewName> = V extends "_base"
  ? Pick<
      SendingSms,
      | "id"
      | "phoneNumber"
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
      SendingSms,
      | "id"
      | "phoneNumber"
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
  ? Pick<SendingSms, "id" | "phoneNumber" | "dateSent">
  : V extends "sendingSms.view"
  ? Pick<
      SendingSms,
      | "id"
      | "phoneNumber"
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
