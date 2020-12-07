import { AbstractParentEntity } from "./AbstractParentEntity";
export class RecognitionLoginLog extends AbstractParentEntity {
  static NAME = "tsadv$RecognitionLoginLog";
  login?: string | null;
  sessionId?: any | null;
  dateTime?: any | null;
}
export type RecognitionLoginLogViewName = "_minimal" | "_local" | "_base";
export type RecognitionLoginLogView<
  V extends RecognitionLoginLogViewName
> = V extends "_local"
  ? Pick<
      RecognitionLoginLog,
      | "id"
      | "login"
      | "sessionId"
      | "dateTime"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      RecognitionLoginLog,
      | "id"
      | "login"
      | "sessionId"
      | "dateTime"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
