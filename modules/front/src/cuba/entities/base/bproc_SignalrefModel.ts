import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class SignalRefModel extends BaseUuidEntity {
  static NAME = "bproc_SignalrefModel";
  signalRef?: string | null;
}
export type SignalRefModelViewName = "_base" | "_local" | "_minimal";
export type SignalRefModelView<V extends SignalRefModelViewName> = never;
