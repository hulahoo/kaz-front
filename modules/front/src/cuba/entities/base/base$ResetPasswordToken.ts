import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { UserExt } from "./base$UserExt";
export class ResetPasswordToken extends BaseUuidEntity {
  static NAME = "base$ResetPasswordToken";
  user?: UserExt | null;
  token?: string | null;
  expireAt?: any | null;
  version?: number | null;
  deleteTs?: any | null;
  deletedBy?: string | null;
  updateTs?: any | null;
  updatedBy?: string | null;
  createTs?: any | null;
  createdBy?: string | null;
}
export type ResetPasswordTokenViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "resetPasswordToken.validate";
export type ResetPasswordTokenView<
  V extends ResetPasswordTokenViewName
> = V extends "_minimal"
  ? Pick<ResetPasswordToken, "id">
  : V extends "_local"
  ? Pick<ResetPasswordToken, "id" | "token" | "expireAt">
  : V extends "_base"
  ? Pick<ResetPasswordToken, "id" | "token" | "expireAt">
  : V extends "resetPasswordToken.validate"
  ? Pick<ResetPasswordToken, "id" | "token" | "expireAt" | "user">
  : never;
