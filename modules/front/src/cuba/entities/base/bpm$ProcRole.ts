import { StandardEntity } from "./sys$StandardEntity";
import { ProcDefinition } from "./bpm$ProcDefinition";
export class ProcRole extends StandardEntity {
  static NAME = "bpm$ProcRole";
  name?: string | null;
  code?: string | null;
  procDefinition?: ProcDefinition | null;
  order?: number | null;
  locName?: string | null;
}
export type ProcRoleViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "procRole-with-definition";
export type ProcRoleView<V extends ProcRoleViewName> = V extends "_minimal"
  ? Pick<ProcRole, "id" | "procDefinition" | "code" | "name">
  : V extends "_local"
  ? Pick<ProcRole, "id" | "name" | "code" | "order" | "locName">
  : V extends "_base"
  ? Pick<
      ProcRole,
      "id" | "procDefinition" | "code" | "name" | "order" | "locName"
    >
  : V extends "procRole-with-definition"
  ? Pick<
      ProcRole,
      "id" | "name" | "code" | "order" | "locName" | "procDefinition"
    >
  : never;
