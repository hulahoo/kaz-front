import { StandardEntity } from "./sys$StandardEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { Recognition } from "./tsadv$Recognition";
import { Goods } from "./tsadv$Goods";
import { CoinDistributionRule } from "./tsadv$CoinDistributionRule";
export class PersonCoinLog extends StandardEntity {
  static NAME = "tsadv$PersonCoinLog";
  personGroup?: PersonGroupExt | null;
  comment?: string | null;
  anotherPersonGroup?: PersonGroupExt | null;
  coinType?: any | null;
  actionType?: any | null;
  operationType?: any | null;
  date?: any | null;
  recognition?: Recognition | null;
  goods?: Goods | null;
  quantity?: any | null;
  coinDistributionRule?: CoinDistributionRule | null;
}
export type PersonCoinLogViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "personCoinLog.issue"
  | "personCoinLog.receipt";
export type PersonCoinLogView<
  V extends PersonCoinLogViewName
> = V extends "_base"
  ? Pick<
      PersonCoinLog,
      | "id"
      | "comment"
      | "coinType"
      | "actionType"
      | "operationType"
      | "date"
      | "quantity"
    >
  : V extends "_local"
  ? Pick<
      PersonCoinLog,
      | "id"
      | "comment"
      | "coinType"
      | "actionType"
      | "operationType"
      | "date"
      | "quantity"
    >
  : V extends "personCoinLog.issue"
  ? Pick<
      PersonCoinLog,
      | "id"
      | "comment"
      | "coinType"
      | "actionType"
      | "operationType"
      | "date"
      | "quantity"
    >
  : V extends "personCoinLog.receipt"
  ? Pick<
      PersonCoinLog,
      | "id"
      | "comment"
      | "coinType"
      | "actionType"
      | "operationType"
      | "date"
      | "quantity"
      | "recognition"
    >
  : never;
