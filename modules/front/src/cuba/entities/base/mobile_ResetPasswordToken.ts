import { StandardEntity } from "./sys$StandardEntity";
import { User } from "./sec$User";
export class ResetPasswordToken extends StandardEntity {
  static NAME = "mobile_ResetPasswordToken";
  user?: User | null;
  token?: string | null;
  expireAt?: any | null;
}
export type ResetPasswordTokenViewName = "_base" | "_local" | "_minimal";
export type ResetPasswordTokenView<
  V extends ResetPasswordTokenViewName
> = V extends "_base"
  ? Pick<ResetPasswordToken, "id" | "token" | "expireAt">
  : V extends "_local"
  ? Pick<ResetPasswordToken, "id" | "token" | "expireAt">
  : never;
