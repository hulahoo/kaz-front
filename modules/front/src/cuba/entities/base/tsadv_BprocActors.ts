import { StandardEntity } from "./sys$StandardEntity";
import { DicHrRole } from "./tsadv$DicHrRole";
import { BaseUserExt } from "./base$UserExt";
export class BprocActors extends StandardEntity {
  static NAME = "tsadv_BprocActors";
  entityId?: any | null;
  hrRole?: DicHrRole | null;
  user?: BaseUserExt | null;
  bprocUserTaskCode?: string | null;
}
export type BprocActorsViewName = "_base" | "_local" | "_minimal";
export type BprocActorsView<V extends BprocActorsViewName> = V extends "_base"
  ? Pick<
      BprocActors,
      "id" | "hrRole" | "user" | "entityId" | "bprocUserTaskCode"
    >
  : V extends "_local"
  ? Pick<BprocActors, "id" | "entityId" | "bprocUserTaskCode">
  : V extends "_minimal"
  ? Pick<BprocActors, "id" | "hrRole" | "user">
  : never;
