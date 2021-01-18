import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { MultiInstanceLoopCharacteristicsModel } from "./bproc_MultiInstanceLoopCharacteristicsModel";
import { InOutBindingModel } from "./bproc_InOutBindingModel";
import { ExecutionListenerModel } from "./bproc_ExecutionListenerModel";
export class CallActivityModel extends BaseUuidEntity {
  static NAME = "bproc_CallActivityModel";
  businessId?: string | null;
  name?: string | null;
  calledElement?: string | null;
  calledElementType?: any | null;
  businessKey?: string | null;
  inheritBusinessKey?: boolean | null;
  inheritVariables?: boolean | null;
  multiInstanceLoopCharacteristics?: MultiInstanceLoopCharacteristicsModel | null;
  inBindings?: InOutBindingModel | null;
  outBindings?: InOutBindingModel | null;
  executionListeners?: ExecutionListenerModel | null;
  async?: boolean | null;
  documentation?: string | null;
}
export type CallActivityModelViewName = "_base" | "_local" | "_minimal";
export type CallActivityModelView<
  V extends CallActivityModelViewName
> = V extends "_base"
  ? Pick<CallActivityModel, "id" | "name" | "businessId">
  : V extends "_minimal"
  ? Pick<CallActivityModel, "id" | "name" | "businessId">
  : never;
