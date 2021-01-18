import { BaseStringIdEntity } from "./sys$BaseStringIdEntity";
export class JobData extends BaseStringIdEntity {
  static NAME = "bproc_JobData";
  id?: string | null;
  retries?: number | null;
  exceptionMessage?: string | null;
  processInstanceId?: string | null;
  processDefinitionId?: string | null;
  executionId?: string | null;
  duedate?: any | null;
  createTime?: any | null;
  jobType?: string | null;
}
export type JobDataViewName = "_base" | "_local" | "_minimal";
export type JobDataView<V extends JobDataViewName> = never;
