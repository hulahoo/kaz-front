import { StandardEntity } from "./sys$StandardEntity";
import { UserExt } from "./base$UserExt";
import { JobRequest } from "./tsadv$JobRequest";
export class UserExtJobRequestSeting extends StandardEntity {
  static NAME = "tsadv$UserExtJobRequestSeting";
  viewLater?: boolean | null;
  userExt?: UserExt | null;
  jobRequest?: JobRequest | null;
}
export type UserExtJobRequestSetingViewName = "_minimal" | "_local" | "_base";
export type UserExtJobRequestSetingView<
  V extends UserExtJobRequestSetingViewName
> = V extends "_local"
  ? Pick<UserExtJobRequestSeting, "id" | "viewLater">
  : V extends "_base"
  ? Pick<UserExtJobRequestSeting, "id" | "viewLater">
  : never;
