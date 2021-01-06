import { StandardEntity } from "./sys$StandardEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { CoinDistributionRule } from "./tsadv$CoinDistributionRule";
export class CoinDistributionPerson extends StandardEntity {
  static NAME = "tsadv$CoinDistributionPerson";
  personGroup?: PersonGroupExt | null;
  coinDistributionRule?: CoinDistributionRule | null;
}
export type CoinDistributionPersonViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "coinDistributionPerson.edit";
export type CoinDistributionPersonView<
  V extends CoinDistributionPersonViewName
> = V extends "coinDistributionPerson.edit"
  ? Pick<CoinDistributionPerson, "id" | "personGroup" | "coinDistributionRule">
  : never;
