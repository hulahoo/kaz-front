import { StandardEntity } from "./sys$StandardEntity";
export class ProcModel extends StandardEntity {
  static NAME = "bpm$ProcModel";
  name?: string | null;
  actModelId?: string | null;
  description?: string | null;
}
export type ProcModelViewName = "_minimal" | "_local" | "_base";
export type ProcModelView<V extends ProcModelViewName> = V extends "_minimal"
  ? Pick<ProcModel, "id" | "name">
  : V extends "_local"
  ? Pick<ProcModel, "id" | "name" | "actModelId" | "description">
  : V extends "_base"
  ? Pick<ProcModel, "id" | "name" | "actModelId" | "description">
  : never;
