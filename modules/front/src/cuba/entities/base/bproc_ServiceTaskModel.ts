import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { MultiInstanceLoopCharacteristicsModel } from "./bproc_MultiInstanceLoopCharacteristicsModel";
import { BeanMethodModel } from "./bproc_BeanMethodModel";
import { ExecutionListenerModel } from "./bproc_ExecutionListenerModel";
import { FieldModel } from "./bproc_FieldModel";
export class ServiceTaskModel extends BaseUuidEntity {
  static NAME = "bproc_ServiceTaskModel";
  businessId?: string | null;
  name?: string | null;
  expression?: string | null;
  javaDelegateClass?: string | null;
  delegateExpression?: string | null;
  resultVariable?: string | null;
  multiInstanceLoopCharacteristics?: MultiInstanceLoopCharacteristicsModel | null;
  beanMethod?: BeanMethodModel | null;
  taskType?: string | null;
  async?: boolean | null;
  documentation?: string | null;
  executionListeners?: ExecutionListenerModel | null;
  fields?: FieldModel | null;
}
export type ServiceTaskModelViewName = "_base" | "_local" | "_minimal";
export type ServiceTaskModelView<
  V extends ServiceTaskModelViewName
> = V extends "_base"
  ? Pick<ServiceTaskModel, "id" | "name">
  : V extends "_minimal"
  ? Pick<ServiceTaskModel, "id" | "name">
  : never;
