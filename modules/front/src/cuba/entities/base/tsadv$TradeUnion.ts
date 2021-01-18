import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicTradeUnion } from "./tsadv$DicTradeUnion";
export class TradeUnion extends AbstractParentEntity {
  static NAME = "tsadv$TradeUnion";
  personGroup?: PersonGroupExt | null;
  joingTradeUnion?: any | null;
  dateTo?: any | null;
  dicTradeUnion?: DicTradeUnion | null;
}
export type TradeUnionViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "tradeUnionOnPersonCard";
export type TradeUnionView<V extends TradeUnionViewName> = V extends "_base"
  ? Pick<
      TradeUnion,
      | "id"
      | "personGroup"
      | "dicTradeUnion"
      | "joingTradeUnion"
      | "dateTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      TradeUnion,
      | "id"
      | "joingTradeUnion"
      | "dateTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<TradeUnion, "id" | "personGroup" | "dicTradeUnion">
  : V extends "tradeUnionOnPersonCard"
  ? Pick<
      TradeUnion,
      | "id"
      | "joingTradeUnion"
      | "dateTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "personGroup"
      | "dicTradeUnion"
    >
  : never;
