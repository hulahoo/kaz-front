import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class MessageDefinitionModel extends BaseUuidEntity {
  static NAME = "bproc_MessageDefinitionModel";
  businessId?: string | null;
  name?: string | null;
}
export type MessageDefinitionModelViewName = "_base" | "_local" | "_minimal";
export type MessageDefinitionModelView<
  V extends MessageDefinitionModelViewName
> = V extends "_base"
  ? Pick<MessageDefinitionModel, "id" | "name" | "businessId">
  : V extends "_minimal"
  ? Pick<MessageDefinitionModel, "id" | "name" | "businessId">
  : never;
