import { StandardEntity } from "./sys$StandardEntity";
import { TelegramCommandVariable } from "./tsadv$TelegramCommandVariable";
export class TelegramAnswer extends StandardEntity {
  static NAME = "tsadv$TelegramAnswer";
  comandName?: string | null;
  variable?: TelegramCommandVariable[] | null;
}
export type TelegramAnswerViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "telegramAnswer-view";
export type TelegramAnswerView<
  V extends TelegramAnswerViewName
> = V extends "_minimal"
  ? Pick<TelegramAnswer, "id" | "comandName">
  : V extends "_local"
  ? Pick<TelegramAnswer, "id" | "comandName">
  : V extends "_base"
  ? Pick<TelegramAnswer, "id" | "comandName">
  : V extends "telegramAnswer-view"
  ? Pick<TelegramAnswer, "id" | "comandName" | "variable">
  : never;
