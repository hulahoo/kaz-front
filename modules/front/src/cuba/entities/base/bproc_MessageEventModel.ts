import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { MessageRefModel } from "./bproc_MessageRefModel";
export class MessageEventModel extends BaseUuidEntity {
  static NAME = "bproc_MessageEventModel";
  businessId?: string | null;
  name?: string | null;
  messageRefModel?: MessageRefModel | null;
}
export type MessageEventModelViewName = "_base" | "_local" | "_minimal";
export type MessageEventModelView<V extends MessageEventModelViewName> = never;
