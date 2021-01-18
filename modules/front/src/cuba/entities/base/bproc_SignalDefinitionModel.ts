import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class SignalDefinitionModel extends BaseUuidEntity {
  static NAME = "bproc_SignalDefinitionModel";
  businessId?: string | null;
  name?: string | null;
  scope?: any | null;
}
export type SignalDefinitionModelViewName = "_base" | "_local" | "_minimal";
export type SignalDefinitionModelView<
  V extends SignalDefinitionModelViewName
> = V extends "_base"
  ? Pick<SignalDefinitionModel, "id" | "name" | "businessId">
  : V extends "_minimal"
  ? Pick<SignalDefinitionModel, "id" | "name" | "businessId">
  : never;
