import { StandardEntity } from "./sys$StandardEntity";
import { DicEventType } from "./tsadv$DicEventType";
import { UOM } from "./tsadv$UOM";
export class SafetyEvent extends StandardEntity {
  static NAME = "tsadv$SafetyEvent";
  code?: string | null;
  name?: string | null;
  type?: DicEventType | null;
  uom?: UOM | null;
}
export type SafetyEventViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "safetyEvent-view";
export type SafetyEventView<V extends SafetyEventViewName> = V extends "_base"
  ? Pick<SafetyEvent, "id" | "name" | "code">
  : V extends "_local"
  ? Pick<SafetyEvent, "id" | "code" | "name">
  : V extends "_minimal"
  ? Pick<SafetyEvent, "id" | "name">
  : V extends "safetyEvent-view"
  ? Pick<SafetyEvent, "id" | "name" | "code" | "type" | "uom">
  : never;
