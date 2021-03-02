import { StandardEntity } from "./sys$StandardEntity";
import { User } from "./sec$User";
export class FireUserInfo extends StandardEntity {
  static NAME = "mobile_FireUserInfo";
  user?: User | null;
  fireId?: string | null;
}
export type FireUserInfoViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "fireUserInfo-view";
export type FireUserInfoView<V extends FireUserInfoViewName> = V extends "_base"
  ? Pick<FireUserInfo, "id" | "fireId">
  : V extends "_local"
  ? Pick<FireUserInfo, "id" | "fireId">
  : V extends "fireUserInfo-view"
  ? Pick<FireUserInfo, "id" | "fireId" | "user">
  : never;
