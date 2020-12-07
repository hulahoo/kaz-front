import { StandardEntity } from "./sys$StandardEntity";
import { GradeGroup } from "./tsadv$GradeGroup";
import { CoinDistributionRule } from "./tsadv$CoinDistributionRule";
export class CoinDistributionGrade extends StandardEntity {
  static NAME = "tsadv$CoinDistributionGrade";
  gradeGroup?: GradeGroup | null;
  coinDistributionRule?: CoinDistributionRule | null;
}
export type CoinDistributionGradeViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "coinDistributionGrade.edit";
export type CoinDistributionGradeView<
  V extends CoinDistributionGradeViewName
> = V extends "coinDistributionGrade.edit"
  ? Pick<CoinDistributionGrade, "id" | "gradeGroup">
  : never;
