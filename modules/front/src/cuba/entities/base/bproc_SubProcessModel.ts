import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { MultiInstanceLoopCharacteristicsModel } from "./bproc_MultiInstanceLoopCharacteristicsModel";
import { ExecutionListenerModel } from "./bproc_ExecutionListenerModel";
export class SubProcessModel extends BaseUuidEntity {
  static NAME = "bproc_SubProcessModel";
  businessId?: string | null;
  name?: string | null;
  multiInstanceLoopCharacteristics?: MultiInstanceLoopCharacteristicsModel | null;
  executionListeners?: ExecutionListenerModel | null;
  async?: boolean | null;
  documentation?: string | null;
}
export type SubProcessModelViewName = "_base" | "_local" | "_minimal";
export type SubProcessModelView<V extends SubProcessModelViewName> = never;
