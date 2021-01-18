import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class ConditionDetailsModel extends BaseUuidEntity {
  static NAME = "bproc_ConditionDetailsModel";
  conditionSource?: any | null;
  conditionType?: string | null;
  userTaskId?: string | null;
  userTaskOutcome?: string | null;
  businessRuleTaskId?: string | null;
  decisionTableOutputVariableName?: string | null;
  decisionTableOutputValue?: string | null;
}
export type ConditionDetailsModelViewName = "_base" | "_local" | "_minimal";
export type ConditionDetailsModelView<
  V extends ConditionDetailsModelViewName
> = never;
