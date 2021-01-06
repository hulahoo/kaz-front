import { BaseStringIdEntity } from "./sys$BaseStringIdEntity";
export class HistoricVariableInstanceData extends BaseStringIdEntity {
  static NAME = "bproc_HistoricVariableInstanceData";
  id?: string | null;
  variableName?: string | null;
  variableTypeName?: string | null;
  processInstanceId?: string | null;
  taskId?: string | null;
  createTime?: any | null;
  lastUpdatedTime?: any | null;
  scopeId?: string | null;
  subScopeId?: string | null;
  scopeType?: string | null;
}
export type HistoricVariableInstanceDataViewName =
  | "_base"
  | "_local"
  | "_minimal";
export type HistoricVariableInstanceDataView<
  V extends HistoricVariableInstanceDataViewName
> = never;
