import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class TimerDescriptionModel extends BaseUuidEntity {
  static NAME = "bproc_TimerDescriptionModel";
  timeDate?: string | null;
  timeDuration?: string | null;
  timeCycle?: string | null;
  timerDefinitionType?: any | null;
}
export type TimerDescriptionModelViewName = "_base" | "_local" | "_minimal";
export type TimerDescriptionModelView<
  V extends TimerDescriptionModelViewName
> = never;
