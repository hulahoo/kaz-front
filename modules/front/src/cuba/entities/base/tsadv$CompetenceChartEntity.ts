import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class CompetenceChartEntity extends BaseUuidEntity {
  static NAME = "tsadv$CompetenceChartEntity";
  competenceName?: string | null;
  scaleName?: string | null;
  assignmentScaleLevel?: any | null;
  positionScaleLevel?: any | null;
  assignmentScaleLevelDesc?: string | null;
  positionScaleLevelDesc?: string | null;
  assignmentScaleLevelName?: string | null;
  positionScaleLevelName?: string | null;
}
export type CompetenceChartEntityViewName = "_minimal" | "_local" | "_base";
export type CompetenceChartEntityView<
  V extends CompetenceChartEntityViewName
> = never;
