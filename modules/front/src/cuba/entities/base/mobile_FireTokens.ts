import { StandardEntity } from "./sys$StandardEntity";
import { FireUserInfo } from "./mobile_FireUserInfo";
export class FireTokens extends StandardEntity {
  static NAME = "mobile_FireTokens";
  token?: string | null;
  deviceInfo?: string | null;
  deviceId?: string | null;
  fireUser?: FireUserInfo | null;
}
export type FireTokensViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "fireTokenForRoleSending"
  | "fireTokens-view";
export type FireTokensView<V extends FireTokensViewName> = V extends "_base"
  ? Pick<FireTokens, "id" | "token" | "deviceInfo" | "deviceId">
  : V extends "_local"
  ? Pick<FireTokens, "id" | "token" | "deviceInfo" | "deviceId">
  : V extends "fireTokenForRoleSending"
  ? Pick<
      FireTokens,
      "id" | "token" | "deviceInfo" | "deviceId" | "createTs" | "fireUser"
    >
  : V extends "fireTokens-view"
  ? Pick<
      FireTokens,
      "id" | "token" | "deviceInfo" | "deviceId" | "createTs" | "fireUser"
    >
  : never;
