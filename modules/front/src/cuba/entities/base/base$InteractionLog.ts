import { StandardEntity } from "./sys$StandardEntity";
import { FileDescriptor } from "./sys$FileDescriptor";
export class InteractionLog extends StandardEntity {
  static NAME = "base$InteractionLog";
  action?: any | null;
  description?: string | null;
  status?: any | null;
  totalQuantity?: number | null;
  successQuantity?: number | null;
  errorQuantity?: number | null;
  warningQuantity?: number | null;
  sourceFile?: FileDescriptor | null;
  resultFile?: FileDescriptor | null;
  statusText?: string | null;
}
export type InteractionLogViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "interactionLog-browse";
export type InteractionLogView<
  V extends InteractionLogViewName
> = V extends "_base"
  ? Pick<
      InteractionLog,
      | "id"
      | "action"
      | "createTs"
      | "description"
      | "status"
      | "totalQuantity"
      | "successQuantity"
      | "errorQuantity"
      | "warningQuantity"
      | "statusText"
    >
  : V extends "_local"
  ? Pick<
      InteractionLog,
      | "id"
      | "action"
      | "description"
      | "status"
      | "totalQuantity"
      | "successQuantity"
      | "errorQuantity"
      | "warningQuantity"
      | "statusText"
    >
  : V extends "_minimal"
  ? Pick<InteractionLog, "id" | "action" | "createTs">
  : V extends "interactionLog-browse"
  ? Pick<
      InteractionLog,
      | "id"
      | "action"
      | "createTs"
      | "description"
      | "status"
      | "totalQuantity"
      | "successQuantity"
      | "errorQuantity"
      | "warningQuantity"
      | "statusText"
      | "sourceFile"
      | "resultFile"
      | "createTs"
    >
  : never;
