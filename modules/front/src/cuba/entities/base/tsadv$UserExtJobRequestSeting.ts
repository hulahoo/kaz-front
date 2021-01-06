import { StandardEntity } from "./sys$StandardEntity";
import { TsadvUserExt } from "./tsadv$UserExt";
import { JobRequest } from "./tsadv$JobRequest";
export class UserExtJobRequestSeting extends StandardEntity {
  static NAME = "tsadv$UserExtJobRequestSeting";
  viewLater?: boolean | null;
  userExt?: TsadvUserExt | null;
  jobRequest?: JobRequest | null;
}
export type UserExtJobRequestSetingViewName = "_base" | "_local" | "_minimal";
export type UserExtJobRequestSetingView<
  V extends UserExtJobRequestSetingViewName
> = V extends "_base"
  ? Pick<UserExtJobRequestSeting, "id" | "viewLater">
  : V extends "_local"
  ? Pick<UserExtJobRequestSeting, "id" | "viewLater">
  : never;
