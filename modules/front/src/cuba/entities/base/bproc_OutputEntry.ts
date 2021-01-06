import { BaseStringIdEntity } from "./sys$BaseStringIdEntity";
export class OutputEntry extends BaseStringIdEntity {
  static NAME = "bproc_OutputEntry";
  id?: string | null;
  text?: string | null;
}
export type OutputEntryViewName = "_base" | "_local" | "_minimal";
export type OutputEntryView<V extends OutputEntryViewName> = never;
