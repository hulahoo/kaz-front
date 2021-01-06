import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { FormDataModel } from "./bproc_FormDataModel";
import { MultiInstanceLoopCharacteristicsModel } from "./bproc_MultiInstanceLoopCharacteristicsModel";
import { TaskListenerModel } from "./bproc_TaskListenerModel";
import { ExecutionListenerModel } from "./bproc_ExecutionListenerModel";
export class UserTaskModel extends BaseUuidEntity {
  static NAME = "bproc_UserTaskModel";
  businessId?: string | null;
  name?: string | null;
  formData?: FormDataModel | null;
  multiInstanceLoopCharacteristics?: MultiInstanceLoopCharacteristicsModel | null;
  documentation?: string | null;
  dueDate?: string | null;
  taskListeners?: TaskListenerModel | null;
  executionListeners?: ExecutionListenerModel | null;
}
export type UserTaskModelViewName = "_base" | "_local" | "_minimal";
export type UserTaskModelView<
  V extends UserTaskModelViewName
> = V extends "_base"
  ? Pick<UserTaskModel, "id" | "name" | "businessId">
  : V extends "_minimal"
  ? Pick<UserTaskModel, "id" | "name" | "businessId">
  : never;
