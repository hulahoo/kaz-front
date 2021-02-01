import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { DicHrRole } from "./tsadv$DicHrRole";
import { UserExt } from "./tsadv$UserExt";
export class NotPersisitBprocActors extends BaseUuidEntity {
  static NAME = "tsadv_NotPersisitBprocActors";
  hrRole?: DicHrRole | null;
  users?: UserExt | null;
  bprocUserTaskCode?: string | null;
  isSystemRecord?: boolean | null;
  isEditable?: boolean | null;
  order?: number | null;
}
export type NotPersisitBprocActorsViewName = "_base" | "_local" | "_minimal";
export type NotPersisitBprocActorsView<
  V extends NotPersisitBprocActorsViewName
> = V extends "_base"
  ? Pick<NotPersisitBprocActors, "id" | "hrRole" | "bprocUserTaskCode">
  : V extends "_minimal"
  ? Pick<NotPersisitBprocActors, "id" | "hrRole" | "bprocUserTaskCode">
  : never;
