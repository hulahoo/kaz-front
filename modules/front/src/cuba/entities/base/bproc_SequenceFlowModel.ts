import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { ConditionDetailsModel } from "./bproc_ConditionDetailsModel";
import { ExecutionListenerModel } from "./bproc_ExecutionListenerModel";
export class SequenceFlowModel extends BaseUuidEntity {
  static NAME = "bproc_SequenceFlowModel";
  businessId?: string | null;
  name?: string | null;
  conditionExpression?: string | null;
  conditionDetails?: ConditionDetailsModel | null;
  executionListeners?: ExecutionListenerModel | null;
  documentation?: string | null;
}
export type SequenceFlowModelViewName = "_base" | "_local" | "_minimal";
export type SequenceFlowModelView<
  V extends SequenceFlowModelViewName
> = V extends "_base"
  ? Pick<SequenceFlowModel, "id" | "name">
  : V extends "_minimal"
  ? Pick<SequenceFlowModel, "id" | "name">
  : never;
