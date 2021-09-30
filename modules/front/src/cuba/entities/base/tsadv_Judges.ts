import { StandardEntity } from "./sys$StandardEntity";
export class Judges extends StandardEntity {
  static NAME = "tsadv_Judges";
}
export type JudgesViewName = "_base" | "_local" | "_minimal";
export type JudgesView<V extends JudgesViewName> = never;
