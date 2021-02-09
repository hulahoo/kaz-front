import { TaskData } from "./bproc_TaskData";
import { UserExt } from "./tsadv$UserExt";
import { DicHrRole } from "./tsadv$DicHrRole";
export class ExtTaskData extends TaskData {
  static NAME = "tsadv_ExtTaskData";
  assigneeOrCandidates?: UserExt[] | null;
  outcome?: string | null;
  hrRole?: DicHrRole | null;
  comment?: string | null;
}
export type ExtTaskDataViewName = "_base" | "_local" | "_minimal";
export type ExtTaskDataView<V extends ExtTaskDataViewName> = V extends "_base"
  ? Pick<ExtTaskData, "taskDefinitionKey" | "id">
  : V extends "_minimal"
  ? Pick<ExtTaskData, "taskDefinitionKey" | "id">
  : never;
