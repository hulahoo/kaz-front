import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class CoinLogPojo extends BaseUuidEntity {
  static NAME = "tsadv$CoinLogPojo";
  actionType?: string | null;
  coinType?: string | null;
  coins?: string | null;
  target?: string | null;
  targetId?: string | null;
  operationType?: string | null;
  date?: string | null;
  comment?: string | null;
}
export type CoinLogPojoViewName = "_base" | "_local" | "_minimal";
export type CoinLogPojoView<V extends CoinLogPojoViewName> = never;
