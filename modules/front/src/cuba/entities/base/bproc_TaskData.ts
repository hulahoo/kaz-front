import { BaseStringIdEntity } from "./sys$BaseStringIdEntity";
export class TaskData extends BaseStringIdEntity {
  static NAME = "bproc_TaskData";
  id?: string | null;
  name?: string | null;
  description?: string | null;
  assignee?: string | null;
  dueDate?: any | null;
  processInstanceId?: string | null;
  executionId?: string | null;
  processDefinitionId?: string | null;
  taskDefinitionKey?: string | null;
  createTime?: any | null;
  endTime?: any | null;
  claimTime?: any | null;
}
export type TaskDataViewName = "_base" | "_local" | "_minimal";
export type TaskDataView<V extends TaskDataViewName> = V extends "_base"
  ? Pick<TaskData, "taskDefinitionKey" | "id">
  : V extends "_minimal"
  ? Pick<TaskData, "taskDefinitionKey" | "id">
  : never;
