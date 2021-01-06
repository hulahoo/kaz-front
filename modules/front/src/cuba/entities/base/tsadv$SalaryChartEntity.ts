import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class SalaryChartEntity extends BaseUuidEntity {
  static NAME = "tsadv$SalaryChartEntity";
  salary?: any | null;
  salaryDescription?: string | null;
  color?: string | null;
}
export type SalaryChartEntityViewName = "_base" | "_local" | "_minimal";
export type SalaryChartEntityView<V extends SalaryChartEntityViewName> = never;
