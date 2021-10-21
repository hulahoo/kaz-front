import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { DicHrRole } from "./tsadv$DicHrRole";
import { TsadvUser } from "./tsadv$UserExt";
import { BpmRolesLink } from "./tsadv$BpmRolesLink";
export class NotPersisitBprocActors extends BaseUuidEntity {
  static NAME = "tsadv_NotPersisitBprocActors";
  hrRole?: DicHrRole | null;
  users?: TsadvUser | null;
  bprocUserTaskCode?: string | null;
  isSystemRecord?: boolean | null;
  isEditable?: boolean | null;
  order?: number | null;
  rolesLink?: BpmRolesLink | null;
}
export type NotPersisitBprocActorsViewName = "_base" | "_local" | "_minimal";
export type NotPersisitBprocActorsView<
  V extends NotPersisitBprocActorsViewName
> = V extends "_base"
  ? Pick<NotPersisitBprocActors, "id" | "hrRole" | "bprocUserTaskCode">
  : V extends "_minimal"
  ? Pick<NotPersisitBprocActors, "id" | "hrRole" | "bprocUserTaskCode">
  : never;
