import { BaseStringIdEntity } from "./sys$BaseStringIdEntity";
export class DmnHistoricDecisionExecutionData extends BaseStringIdEntity {
  static NAME = "bproc_DmnHistoricDecisionExecutionData";
  id?: string | null;
  decisionDefinitionId?: string | null;
  startTime?: any | null;
  endTime?: any | null;
  instanceId?: string | null;
  executionId?: string | null;
  activityId?: string | null;
  failed?: boolean | null;
  executionJson?: string | null;
  decisionKey?: string | null;
  decisionName?: string | null;
  decisionVersion?: string | null;
}
export type DmnHistoricDecisionExecutionDataViewName =
  | "_base"
  | "_local"
  | "_minimal";
export type DmnHistoricDecisionExecutionDataView<
  V extends DmnHistoricDecisionExecutionDataViewName
> = never;
