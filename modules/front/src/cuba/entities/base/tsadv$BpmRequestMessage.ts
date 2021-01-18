import { StandardEntity } from "./sys$StandardEntity";
import { UserExt } from "./tsadv$UserExt";
import { Activity } from "./uactivity$Activity";
export class BpmRequestMessage extends StandardEntity {
  static NAME = "tsadv$BpmRequestMessage";
  entityName?: string | null;
  entityId?: any | null;
  entityRequestNumber?: any | null;
  sendDate?: any | null;
  message?: string | null;
  assignedUser?: UserExt | null;
  assignedBy?: UserExt | null;
  parent?: BpmRequestMessage | null;
  lvl?: number | null;
  screenName?: string | null;
  activity?: Activity | null;
}
export type BpmRequestMessageViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "bpmRequestMessage-view";
export type BpmRequestMessageView<
  V extends BpmRequestMessageViewName
> = V extends "_base"
  ? Pick<
      BpmRequestMessage,
      | "id"
      | "entityName"
      | "entityId"
      | "entityRequestNumber"
      | "sendDate"
      | "message"
      | "lvl"
      | "screenName"
    >
  : V extends "_local"
  ? Pick<
      BpmRequestMessage,
      | "id"
      | "entityName"
      | "entityId"
      | "entityRequestNumber"
      | "sendDate"
      | "message"
      | "lvl"
      | "screenName"
    >
  : V extends "bpmRequestMessage-view"
  ? Pick<
      BpmRequestMessage,
      | "id"
      | "entityName"
      | "entityId"
      | "entityRequestNumber"
      | "sendDate"
      | "message"
      | "lvl"
      | "screenName"
      | "assignedUser"
      | "assignedBy"
      | "parent"
      | "activity"
    >
  : never;
