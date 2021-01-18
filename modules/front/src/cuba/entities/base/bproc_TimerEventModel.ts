import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { TimerDescriptionModel } from "./bproc_TimerDescriptionModel";
export class TimerEventModel extends BaseUuidEntity {
  static NAME = "bproc_TimerEventModel";
  businessId?: string | null;
  name?: string | null;
  timerDescription?: TimerDescriptionModel | null;
}
export type TimerEventModelViewName = "_base" | "_local" | "_minimal";
export type TimerEventModelView<
  V extends TimerEventModelViewName
> = V extends "_base"
  ? Pick<TimerEventModel, "id" | "name">
  : V extends "_minimal"
  ? Pick<TimerEventModel, "id" | "name">
  : never;
