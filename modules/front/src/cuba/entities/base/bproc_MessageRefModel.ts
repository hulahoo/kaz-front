import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class MessageRefModel extends BaseUuidEntity {
  static NAME = "bproc_MessageRefModel";
  messageRef?: string | null;
}
export type MessageRefModelViewName = "_base" | "_local" | "_minimal";
export type MessageRefModelView<V extends MessageRefModelViewName> = never;
