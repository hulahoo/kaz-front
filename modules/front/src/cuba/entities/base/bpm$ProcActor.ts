import { StandardEntity } from "./sys$StandardEntity";
import { User } from "./sec$User";
import { ProcInstance } from "./bpm$ProcInstance";
import { ProcRole } from "./bpm$ProcRole";
export class ProcActor extends StandardEntity {
  static NAME = "bpm$ProcActor";
  user?: User | null;
  procInstance?: ProcInstance | null;
  procRole?: ProcRole | null;
  order?: number | null;
}
export type ProcActorViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "procActor-procTaskCreation"
  | "procActor-edit"
  | "procActor-browse"
  | "procActor-browseLoc"
  | "procActor-edit";
export type ProcActorView<V extends ProcActorViewName> = V extends "_minimal"
  ? Pick<ProcActor, "id" | "user" | "procRole">
  : V extends "_local"
  ? Pick<ProcActor, "id" | "order">
  : V extends "_base"
  ? Pick<ProcActor, "id" | "user" | "procRole" | "order">
  : V extends "procActor-procTaskCreation"
  ? Pick<ProcActor, "id" | "order" | "user" | "procRole" | "procInstance">
  : V extends "procActor-edit"
  ? Pick<ProcActor, "id" | "order" | "user" | "procRole">
  : V extends "procActor-browse"
  ? Pick<ProcActor, "id" | "order" | "procRole" | "user">
  : V extends "procActor-browseLoc"
  ? Pick<
      ProcActor,
      | "id"
      | "order"
      | "procRole"
      | "user"
      | "procRole"
      | "user"
      | "procInstance"
    >
  : V extends "procActor-edit"
  ? Pick<ProcActor, "id" | "order" | "user" | "procRole" | "procRole">
  : never;
