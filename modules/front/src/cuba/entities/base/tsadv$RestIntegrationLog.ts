import { StandardEntity } from "./sys$StandardEntity";
export class RestIntegrationLog extends StandardEntity {
  static NAME = "tsadv$RestIntegrationLog";
  requestId?: string | null;
  login?: string | null;
  methodName?: string | null;
  params?: string | null;
  message?: string | null;
  success?: boolean | null;
  dateTime?: any | null;
}
export type RestIntegrationLogViewName = "_base" | "_local" | "_minimal";
export type RestIntegrationLogView<
  V extends RestIntegrationLogViewName
> = V extends "_base"
  ? Pick<
      RestIntegrationLog,
      | "id"
      | "requestId"
      | "login"
      | "methodName"
      | "params"
      | "message"
      | "success"
      | "dateTime"
    >
  : V extends "_local"
  ? Pick<
      RestIntegrationLog,
      | "id"
      | "requestId"
      | "login"
      | "methodName"
      | "params"
      | "message"
      | "success"
      | "dateTime"
    >
  : never;
