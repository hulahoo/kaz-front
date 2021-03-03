import { StandardEntity } from "./sys$StandardEntity";
import { User } from "./sec$User";
export class PushNotification extends StandardEntity {
  static NAME = "mobile_PushNotification";
  title?: string | null;
  content?: string | null;
  imageUrl?: string | null;
  sendDateTime?: any | null;
  receiver?: User | null;
  status?: any | null;
  sender?: User | null;
}
export type PushNotificationViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "pushNotification-view";
export type PushNotificationView<
  V extends PushNotificationViewName
> = V extends "_base"
  ? Pick<
      PushNotification,
      "id" | "title" | "content" | "imageUrl" | "sendDateTime" | "status"
    >
  : V extends "_local"
  ? Pick<
      PushNotification,
      "id" | "title" | "content" | "imageUrl" | "sendDateTime" | "status"
    >
  : V extends "_minimal"
  ? Pick<PushNotification, "id" | "title">
  : V extends "pushNotification-view"
  ? Pick<
      PushNotification,
      | "id"
      | "title"
      | "content"
      | "imageUrl"
      | "sendDateTime"
      | "status"
      | "receiver"
      | "sender"
    >
  : never;
