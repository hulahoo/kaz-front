import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { ProcessModel } from "./bproc_ProcessModel";
export class ParticipantModel extends BaseUuidEntity {
  static NAME = "bproc_ParticipantModel";
  businessId?: string | null;
  name?: string | null;
  process?: ProcessModel | null;
}
export type ParticipantModelViewName = "_base" | "_local" | "_minimal";
export type ParticipantModelView<
  V extends ParticipantModelViewName
> = V extends "_base"
  ? Pick<ParticipantModel, "id" | "name">
  : V extends "_minimal"
  ? Pick<ParticipantModel, "id" | "name">
  : never;
