import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class VariableInstanceData extends BaseUuidEntity {
  static NAME = "bproc_VariableInstanceData";
  name?: string | null;
  typeName?: string | null;
  textValue?: string | null;
  textValue2?: string | null;
  executionId?: string | null;
}
export type VariableInstanceDataViewName = "_base" | "_local" | "_minimal";
export type VariableInstanceDataView<
  V extends VariableInstanceDataViewName
> = V extends "_base"
  ? Pick<VariableInstanceData, "id" | "name">
  : V extends "_minimal"
  ? Pick<VariableInstanceData, "id" | "name">
  : never;
