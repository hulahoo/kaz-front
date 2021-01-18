import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { SignalRefModel } from "./bproc_SignalrefModel";
export class SignalEventModel extends BaseUuidEntity {
  static NAME = "bproc_SignalEventModel";
  businessId?: string | null;
  name?: string | null;
  signalRefModel?: SignalRefModel | null;
}
export type SignalEventModelViewName = "_base" | "_local" | "_minimal";
export type SignalEventModelView<V extends SignalEventModelViewName> = never;
