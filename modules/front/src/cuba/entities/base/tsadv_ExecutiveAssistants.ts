import {AbstractParentEntity} from "./AbstractParentEntity";
import {PositionGroupExt} from "./base$PositionGroupExt";

export class ExecutiveAssistants extends AbstractParentEntity {
  static NAME = "tsadv_ExecutiveAssistants";
  managerPositionGroup?: PositionGroupExt | null;
  assistancePositionGroup?: PositionGroupExt | null;
  startDate?: any | null;
  endDate?: any | null;
}

export type StudentHomeworkViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "executiveAssistants-browseView";
export type StudentHomeworkView<V extends StudentHomeworkViewName> = V extends "_base"
  ? Pick<ExecutiveAssistants,
    | "startDate"
    | "endDate"
    | "managerPositionGroup">
  : V extends "_local"
    ? Pick<ExecutiveAssistants,
      | "startDate"
      | "endDate">
    : V extends "executiveAssistants-browseView"
      ? Pick<ExecutiveAssistants,
        | "startDate"
        | "endDate"
        | "managerPositionGroup"
        | "assistancePositionGroup">
      : never;
