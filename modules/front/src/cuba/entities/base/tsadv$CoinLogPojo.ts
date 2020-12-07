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
export type CoinLogPojoViewName = "_minimal" | "_local" | "_base";
export type CoinLogPojoView<V extends CoinLogPojoViewName> = never;
