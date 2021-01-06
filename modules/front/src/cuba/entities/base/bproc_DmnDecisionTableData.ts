import { BaseStringIdEntity } from "./sys$BaseStringIdEntity";
export class DmnDecisionTableData extends BaseStringIdEntity {
  static NAME = "bproc_DmnDecisionTableData";
  id?: string | null;
  category?: string | null;
  name?: string | null;
  key?: string | null;
  description?: string | null;
  version?: number | null;
  deploymentId?: string | null;
}
export type DmnDecisionTableDataViewName = "_base" | "_local" | "_minimal";
export type DmnDecisionTableDataView<
  V extends DmnDecisionTableDataViewName
> = never;
