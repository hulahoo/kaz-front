import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { FieldModel } from "./bproc_FieldModel";
export class ExecutionListenerModel extends BaseUuidEntity {
  static NAME = "bproc_ExecutionListenerModel";
  event?: string | null;
  className?: string | null;
  expression?: string | null;
  delegateExpression?: string | null;
  fields?: FieldModel | null;
  implementation?: string | null;
}
export type ExecutionListenerModelViewName = "_base" | "_local" | "_minimal";
export type ExecutionListenerModelView<
  V extends ExecutionListenerModelViewName
> = never;
