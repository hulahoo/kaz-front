import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { FieldModel } from "./bproc_FieldModel";
export class TaskListenerModel extends BaseUuidEntity {
  static NAME = "bproc_TaskListenerModel";
  event?: string | null;
  className?: string | null;
  expression?: string | null;
  delegateExpression?: string | null;
  fields?: FieldModel | null;
  implementation?: string | null;
}
export type TaskListenerModelViewName = "_base" | "_local" | "_minimal";
export type TaskListenerModelView<V extends TaskListenerModelViewName> = never;
