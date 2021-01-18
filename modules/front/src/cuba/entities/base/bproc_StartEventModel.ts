import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { ExecutionListenerModel } from "./bproc_ExecutionListenerModel";
import { FormDataModel } from "./bproc_FormDataModel";
import { MessageRefModel } from "./bproc_MessageRefModel";
import { SignalRefModel } from "./bproc_SignalrefModel";
import { TimerDescriptionModel } from "./bproc_TimerDescriptionModel";
import { ProcessVariableModel } from "./bproc_ProcessVariableModel";
export class StartEventModel extends BaseUuidEntity {
  static NAME = "bproc_StartEventModel";
  businessId?: string | null;
  name?: string | null;
  executionListeners?: ExecutionListenerModel | null;
  formData?: FormDataModel | null;
  messageRefModel?: MessageRefModel | null;
  signalRefModel?: SignalRefModel | null;
  timerDescription?: TimerDescriptionModel | null;
  documentation?: string | null;
  processVariables?: ProcessVariableModel | null;
}
export type StartEventModelViewName = "_base" | "_local" | "_minimal";
export type StartEventModelView<
  V extends StartEventModelViewName
> = V extends "_base"
  ? Pick<StartEventModel, "id" | "name">
  : V extends "_minimal"
  ? Pick<StartEventModel, "id" | "name">
  : never;
