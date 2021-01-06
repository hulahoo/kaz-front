import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { InputEntry } from "./bproc_InputEntry";
import { OutputEntry } from "./bproc_OutputEntry";
export class Rule extends BaseUuidEntity {
  static NAME = "bproc_Rule";
  inputEntries?: InputEntry | null;
  outputEntries?: OutputEntry | null;
  description?: string | null;
}
export type RuleViewName = "_base" | "_local" | "_minimal";
export type RuleView<V extends RuleViewName> = never;
