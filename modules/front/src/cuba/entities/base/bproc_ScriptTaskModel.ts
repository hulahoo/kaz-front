import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { MultiInstanceLoopCharacteristicsModel } from "./bproc_MultiInstanceLoopCharacteristicsModel";
import { ExecutionListenerModel } from "./bproc_ExecutionListenerModel";
export class ScriptTaskModel extends BaseUuidEntity {
  static NAME = "bproc_ScriptTaskModel";
  businessId?: string | null;
  name?: string | null;
  scriptFormat?: string | null;
  script?: string | null;
  resultVariable?: string | null;
  multiInstanceLoopCharacteristics?: MultiInstanceLoopCharacteristicsModel | null;
  executionListeners?: ExecutionListenerModel | null;
  async?: boolean | null;
  documentation?: string | null;
}
export type ScriptTaskModelViewName = "_base" | "_local" | "_minimal";
export type ScriptTaskModelView<
  V extends ScriptTaskModelViewName
> = V extends "_base"
  ? Pick<ScriptTaskModel, "id" | "name">
  : V extends "_minimal"
  ? Pick<ScriptTaskModel, "id" | "name">
  : never;
