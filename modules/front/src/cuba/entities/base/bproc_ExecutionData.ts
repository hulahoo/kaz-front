import { BaseStringIdEntity } from "./sys$BaseStringIdEntity";
export class ExecutionData extends BaseStringIdEntity {
  static NAME = "bproc_ExecutionData";
  id?: string | null;
  parentId?: string | null;
  processInstanceId?: string | null;
  activityId?: string | null;
  parent?: ExecutionData | null;
  description?: string | null;
  caption?: string | null;
}
export type ExecutionDataViewName = "_base" | "_local" | "_minimal";
export type ExecutionDataView<
  V extends ExecutionDataViewName
> = V extends "_base"
  ? Pick<ExecutionData, "id" | "activityId">
  : V extends "_minimal"
  ? Pick<ExecutionData, "id" | "activityId">
  : never;
