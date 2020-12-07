import { StandardEntity } from "./sys$StandardEntity";
import { TelegramAnswer } from "./tsadv$TelegramAnswer";
export class TelegramCommandVariable extends StandardEntity {
  static NAME = "tsadv$TelegramCommandVariable";
  nameVariable?: string | null;
  telegramAnswer?: TelegramAnswer | null;
}
export type TelegramCommandVariableViewName = "_minimal" | "_local" | "_base";
export type TelegramCommandVariableView<
  V extends TelegramCommandVariableViewName
> = V extends "_minimal"
  ? Pick<TelegramCommandVariable, "id" | "nameVariable">
  : V extends "_local"
  ? Pick<TelegramCommandVariable, "id" | "nameVariable">
  : V extends "_base"
  ? Pick<TelegramCommandVariable, "id" | "nameVariable">
  : never;
