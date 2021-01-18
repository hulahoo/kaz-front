import { BaseStringIdEntity } from "./sys$BaseStringIdEntity";
export class ProcessDefinitionData extends BaseStringIdEntity {
  static NAME = "bproc_ProcessDefinitionData";
  id?: string | null;
  name?: string | null;
  key?: string | null;
  description?: string | null;
  deploymentId?: string | null;
  version?: number | null;
}
export type ProcessDefinitionDataViewName = "_base" | "_local" | "_minimal";
export type ProcessDefinitionDataView<
  V extends ProcessDefinitionDataViewName
> = V extends "_base"
  ? Pick<ProcessDefinitionData, "id" | "key" | "version">
  : V extends "_minimal"
  ? Pick<ProcessDefinitionData, "id" | "key" | "version">
  : never;
