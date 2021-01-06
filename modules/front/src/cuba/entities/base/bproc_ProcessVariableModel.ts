import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class ProcessVariableModel extends BaseUuidEntity {
  static NAME = "bproc_ProcessVariableModel";
  name?: string | null;
  type?: string | null;
}
export type ProcessVariableModelViewName = "_base" | "_local" | "_minimal";
export type ProcessVariableModelView<
  V extends ProcessVariableModelViewName
> = V extends "_base"
  ? Pick<ProcessVariableModel, "id" | "name">
  : V extends "_minimal"
  ? Pick<ProcessVariableModel, "id" | "name">
  : never;
