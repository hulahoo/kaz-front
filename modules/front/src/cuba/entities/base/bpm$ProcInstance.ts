import { StandardEntity } from "./sys$StandardEntity";
import { ProcDefinition } from "./bpm$ProcDefinition";
import { User } from "./sec$User";
import { ProcTask } from "./bpm$ProcTask";
import { ProcActor } from "./bpm$ProcActor";
import { ProcAttachment } from "./bpm$ProcAttachment";
export class ProcInstance extends StandardEntity {
  static NAME = "bpm$ProcInstance";
  entityName?: string | null;
  entity?: any | null;
  active?: boolean | null;
  cancelled?: boolean | null;
  actProcessInstanceId?: string | null;
  startDate?: any | null;
  endDate?: any | null;
  procDefinition?: ProcDefinition | null;
  startedBy?: User | null;
  procTasks?: ProcTask[] | null;
  startComment?: string | null;
  cancelComment?: string | null;
  procActors?: ProcActor[] | null;
  procAttachments?: ProcAttachment[] | null;
  entityEditorName?: string | null;
  description?: string | null;
}
export type ProcInstanceViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "procInstance-start"
  | "procInstance-browse"
  | "procInstance-edit"
  | "procInstance-full"
  | "procInstance-start";
export type ProcInstanceView<
  V extends ProcInstanceViewName
> = V extends "_minimal"
  ? Pick<ProcInstance, "procDefinition" | "id">
  : V extends "_local"
  ? Pick<
      ProcInstance,
      | "id"
      | "entityName"
      | "active"
      | "cancelled"
      | "actProcessInstanceId"
      | "startDate"
      | "endDate"
      | "startComment"
      | "cancelComment"
      | "entityEditorName"
      | "description"
    >
  : V extends "_base"
  ? Pick<
      ProcInstance,
      | "procDefinition"
      | "id"
      | "entityName"
      | "active"
      | "cancelled"
      | "actProcessInstanceId"
      | "startDate"
      | "endDate"
      | "startComment"
      | "cancelComment"
      | "entityEditorName"
      | "description"
    >
  : V extends "procInstance-start"
  ? Pick<
      ProcInstance,
      | "id"
      | "entityName"
      | "active"
      | "cancelled"
      | "actProcessInstanceId"
      | "startDate"
      | "endDate"
      | "startComment"
      | "cancelComment"
      | "entityEditorName"
      | "description"
      | "procDefinition"
      | "startedBy"
      | "entity"
    >
  : V extends "procInstance-browse"
  ? Pick<
      ProcInstance,
      | "id"
      | "entityName"
      | "active"
      | "cancelled"
      | "actProcessInstanceId"
      | "startDate"
      | "endDate"
      | "startComment"
      | "cancelComment"
      | "entityEditorName"
      | "description"
      | "procDefinition"
      | "startedBy"
      | "entity"
    >
  : V extends "procInstance-edit"
  ? Pick<
      ProcInstance,
      | "id"
      | "entityName"
      | "active"
      | "cancelled"
      | "actProcessInstanceId"
      | "startDate"
      | "endDate"
      | "startComment"
      | "cancelComment"
      | "entityEditorName"
      | "description"
      | "procDefinition"
      | "startedBy"
      | "entity"
      | "procActors"
      | "procAttachments"
    >
  : V extends "procInstance-full"
  ? Pick<
      ProcInstance,
      | "id"
      | "entityName"
      | "active"
      | "cancelled"
      | "actProcessInstanceId"
      | "startDate"
      | "endDate"
      | "startComment"
      | "cancelComment"
      | "entityEditorName"
      | "description"
      | "procDefinition"
      | "startedBy"
      | "entity"
      | "procActors"
      | "procAttachments"
    >
  : V extends "procInstance-start"
  ? Pick<
      ProcInstance,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "entityName"
      | "active"
      | "cancelled"
      | "actProcessInstanceId"
      | "startDate"
      | "endDate"
      | "startComment"
      | "cancelComment"
      | "entityEditorName"
      | "description"
      | "procDefinition"
      | "startedBy"
      | "entity"
    >
  : never;
