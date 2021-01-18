import { BaseStringIdEntity } from "./sys$BaseStringIdEntity";
export class ProcessInstanceData extends BaseStringIdEntity {
  static NAME = "bproc_ProcessInstanceData";
  id?: string | null;
  processDefinitionId?: string | null;
  processDefinitionKey?: string | null;
  processDefinitionName?: string | null;
  processDefinitionVersion?: number | null;
  deploymentId?: string | null;
  businessKey?: string | null;
  startTime?: any | null;
  endTime?: any | null;
  durationInMillis?: any | null;
  startUserId?: string | null;
  suspended?: boolean | null;
}
export type ProcessInstanceDataViewName = "_base" | "_local" | "_minimal";
export type ProcessInstanceDataView<
  V extends ProcessInstanceDataViewName
> = V extends "_base"
  ? Pick<ProcessInstanceData, "processDefinitionKey" | "id">
  : V extends "_minimal"
  ? Pick<ProcessInstanceData, "processDefinitionKey" | "id">
  : never;
