import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class PositionVacancyChart extends BaseUuidEntity {
  static NAME = "tsadv$PositionVacancyChart";
  positionName?: string | null;
  maxCount?: number | null;
  fillCount?: number | null;
  vacancyCount?: number | null;
}
export type PositionVacancyChartViewName = "_base" | "_local" | "_minimal";
export type PositionVacancyChartView<
  V extends PositionVacancyChartViewName
> = never;
