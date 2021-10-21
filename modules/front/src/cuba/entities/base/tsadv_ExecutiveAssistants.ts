import { StandardEntity } from "./sys$StandardEntity";
import { PositionGroupExt } from "./base$PositionGroupExt";
export class ExecutiveAssistants extends StandardEntity {
  static NAME = "tsadv_ExecutiveAssistants";
  managerPositionGroup?: PositionGroupExt | null;
  assistancePositionGroup?: PositionGroupExt | null;
  startDate?: any | null;
  endDate?: any | null;
}
export type ExecutiveAssistantsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "executiveAssistants-browseView";
export type ExecutiveAssistantsView<
  V extends ExecutiveAssistantsViewName
> = V extends "_base"
  ? Pick<
      ExecutiveAssistants,
      "id" | "startDate" | "endDate" | "managerPositionGroup"
    >
  : V extends "_local"
  ? Pick<ExecutiveAssistants, "id" | "startDate" | "endDate">
  : V extends "_minimal"
  ? Pick<
      ExecutiveAssistants,
      "id" | "startDate" | "endDate" | "managerPositionGroup"
    >
  : V extends "executiveAssistants-browseView"
  ? Pick<
      ExecutiveAssistants,
      | "id"
      | "managerPositionGroup"
      | "assistancePositionGroup"
      | "startDate"
      | "endDate"
    >
  : never;
