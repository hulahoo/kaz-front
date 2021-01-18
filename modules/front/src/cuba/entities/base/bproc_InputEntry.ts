import { BaseStringIdEntity } from "./sys$BaseStringIdEntity";
export class InputEntry extends BaseStringIdEntity {
  static NAME = "bproc_InputEntry";
  id?: string | null;
  text?: string | null;
}
export type InputEntryViewName = "_base" | "_local" | "_minimal";
export type InputEntryView<V extends InputEntryViewName> = never;
