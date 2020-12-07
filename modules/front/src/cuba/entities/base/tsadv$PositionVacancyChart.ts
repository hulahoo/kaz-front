import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class PositionVacancyChart extends BaseUuidEntity {
  static NAME = "tsadv$PositionVacancyChart";
  positionName?: string | null;
  maxCount?: number | null;
  fillCount?: number | null;
  vacancyCount?: number | null;
}
export type PositionVacancyChartViewName = "_minimal" | "_local" | "_base";
export type PositionVacancyChartView<
  V extends PositionVacancyChartViewName
> = never;
