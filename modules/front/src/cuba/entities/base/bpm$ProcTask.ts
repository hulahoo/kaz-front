import { StandardEntity } from "./sys$StandardEntity";
import { ProcInstance } from "./bpm$ProcInstance";
import { ProcActor } from "./bpm$ProcActor";
import { User } from "./sec$User";
export class ProcTask extends StandardEntity {
  static NAME = "bpm$ProcTask";
  procInstance?: ProcInstance | null;
  startDate?: any | null;
  endDate?: any | null;
  outcome?: string | null;
  procActor?: ProcActor | null;
  actExecutionId?: string | null;
  name?: string | null;
  actTaskId?: string | null;
  comment?: string | null;
  cancelled?: boolean | null;
  candidateUsers?: User[] | null;
  claimDate?: any | null;
  actProcessDefinitionId?: string | null;
  actTaskDefinitionKey?: string | null;
  locName?: string | null;
  locOutcome?: string | null;
}
export type ProcTaskViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "procTask-complete"
  | "procTask-frame"
  | "procTask-browse"
  | "procTask-frame-extended"
  | "procTask.viewForNotification";
export type ProcTaskView<V extends ProcTaskViewName> = V extends "_local"
  ? Pick<
      ProcTask,
      | "id"
      | "startDate"
      | "endDate"
      | "outcome"
      | "actExecutionId"
      | "name"
      | "actTaskId"
      | "comment"
      | "cancelled"
      | "claimDate"
      | "actProcessDefinitionId"
      | "actTaskDefinitionKey"
      | "locName"
      | "locOutcome"
    >
  : V extends "_base"
  ? Pick<
      ProcTask,
      | "id"
      | "startDate"
      | "endDate"
      | "outcome"
      | "actExecutionId"
      | "name"
      | "actTaskId"
      | "comment"
      | "cancelled"
      | "claimDate"
      | "actProcessDefinitionId"
      | "actTaskDefinitionKey"
      | "locName"
      | "locOutcome"
    >
  : V extends "procTask-complete"
  ? Pick<
      ProcTask,
      | "id"
      | "startDate"
      | "endDate"
      | "outcome"
      | "actExecutionId"
      | "name"
      | "actTaskId"
      | "comment"
      | "cancelled"
      | "claimDate"
      | "actProcessDefinitionId"
      | "actTaskDefinitionKey"
      | "locName"
      | "locOutcome"
      | "procActor"
      | "procInstance"
    >
  : V extends "procTask-frame"
  ? Pick<
      ProcTask,
      | "id"
      | "startDate"
      | "endDate"
      | "outcome"
      | "actExecutionId"
      | "name"
      | "actTaskId"
      | "comment"
      | "cancelled"
      | "claimDate"
      | "actProcessDefinitionId"
      | "actTaskDefinitionKey"
      | "locName"
      | "locOutcome"
      | "procActor"
    >
  : V extends "procTask-browse"
  ? Pick<
      ProcTask,
      | "id"
      | "startDate"
      | "endDate"
      | "outcome"
      | "actExecutionId"
      | "name"
      | "actTaskId"
      | "comment"
      | "cancelled"
      | "claimDate"
      | "actProcessDefinitionId"
      | "actTaskDefinitionKey"
      | "locName"
      | "locOutcome"
      | "procActor"
      | "procInstance"
    >
  : V extends "procTask-frame-extended"
  ? Pick<
      ProcTask,
      | "id"
      | "startDate"
      | "endDate"
      | "outcome"
      | "actExecutionId"
      | "name"
      | "actTaskId"
      | "comment"
      | "cancelled"
      | "claimDate"
      | "actProcessDefinitionId"
      | "actTaskDefinitionKey"
      | "locName"
      | "locOutcome"
      | "procActor"
      | "procActor"
    >
  : V extends "procTask.viewForNotification"
  ? Pick<
      ProcTask,
      | "id"
      | "startDate"
      | "endDate"
      | "outcome"
      | "actExecutionId"
      | "name"
      | "actTaskId"
      | "comment"
      | "cancelled"
      | "claimDate"
      | "actProcessDefinitionId"
      | "actTaskDefinitionKey"
      | "locName"
      | "locOutcome"
      | "procActor"
    >
  : never;
