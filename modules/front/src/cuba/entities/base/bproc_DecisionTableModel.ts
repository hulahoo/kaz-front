import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { InputDefinition } from "./bproc_InputDefinition";
import { OutputDefinition } from "./bproc_OutputDefinition";
import { Rule } from "./bproc_Rule";
export class DecisionTableModel extends BaseUuidEntity {
  static NAME = "bproc_DecisionTableModel";
  decisionId?: string | null;
  decisionName?: string | null;
  tableId?: string | null;
  hitPolicy?: any | null;
  aggregation?: any | null;
  inputDefinitions?: InputDefinition | null;
  outputDefinitions?: OutputDefinition | null;
  rules?: Rule | null;
}
export type DecisionTableModelViewName = "_base" | "_local" | "_minimal";
export type DecisionTableModelView<
  V extends DecisionTableModelViewName
> = never;
