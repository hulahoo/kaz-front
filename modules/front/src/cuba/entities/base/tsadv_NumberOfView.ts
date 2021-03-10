import { StandardEntity } from "./sys$StandardEntity";
export class NumberOfView extends StandardEntity {
  static NAME = "tsadv_NumberOfView";
  entityName?: string | null;
  entityId?: any | null;
}
export type NumberOfViewViewName = "_base" | "_local" | "_minimal";
export type NumberOfViewView<V extends NumberOfViewViewName> = V extends "_base"
  ? Pick<NumberOfView, "id" | "entityName" | "entityId">
  : V extends "_local"
  ? Pick<NumberOfView, "id" | "entityName" | "entityId">
  : never;
