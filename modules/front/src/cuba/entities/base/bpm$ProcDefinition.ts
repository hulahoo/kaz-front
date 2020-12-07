import { StandardEntity } from "./sys$StandardEntity";
import { ProcRole } from "./bpm$ProcRole";
import { ProcModel } from "./bpm$ProcModel";
export class ProcDefinition extends StandardEntity {
  static NAME = "bpm$ProcDefinition";
  name?: string | null;
  code?: string | null;
  actId?: string | null;
  procRoles?: ProcRole[] | null;
  active?: boolean | null;
  model?: ProcModel | null;
  deploymentDate?: any | null;
  caption?: string | null;
}
export type ProcDefinitionViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "procDefinition-browse"
  | "procDefinition-edit"
  | "procDefinition-procInstanceEdit"
  | "procDefinition-withRoles"
  | "procDefinition-with-model";
export type ProcDefinitionView<
  V extends ProcDefinitionViewName
> = V extends "_minimal"
  ? Pick<ProcDefinition, "id" | "name" | "code" | "deploymentDate">
  : V extends "_local"
  ? Pick<
      ProcDefinition,
      "id" | "name" | "code" | "actId" | "active" | "deploymentDate" | "caption"
    >
  : V extends "_base"
  ? Pick<
      ProcDefinition,
      "id" | "name" | "code" | "deploymentDate" | "actId" | "active" | "caption"
    >
  : V extends "procDefinition-browse"
  ? Pick<
      ProcDefinition,
      "id" | "actId" | "name" | "active" | "code" | "deploymentDate"
    >
  : V extends "procDefinition-edit"
  ? Pick<
      ProcDefinition,
      | "id"
      | "procRoles"
      | "name"
      | "actId"
      | "active"
      | "model"
      | "code"
      | "deploymentDate"
    >
  : V extends "procDefinition-procInstanceEdit"
  ? Pick<
      ProcDefinition,
      | "id"
      | "name"
      | "code"
      | "deploymentDate"
      | "procRoles"
      | "actId"
      | "active"
    >
  : V extends "procDefinition-withRoles"
  ? Pick<
      ProcDefinition,
      | "id"
      | "name"
      | "code"
      | "actId"
      | "active"
      | "deploymentDate"
      | "caption"
      | "procRoles"
    >
  : V extends "procDefinition-with-model"
  ? Pick<ProcDefinition, "id" | "model">
  : never;
