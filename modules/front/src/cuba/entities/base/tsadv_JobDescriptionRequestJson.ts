import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class JobDescriptionRequestJson extends BaseUuidEntity {
  static NAME = "tsadv_JobDescriptionRequestJson";
  requestNumber?: string | null;
  requestDate?: string | null;
  initiator?: string | null;
  requestStatus?: string | null;
  statusCode?: string | null;
}
export type JobDescriptionRequestJsonViewName = "_base" | "_local" | "_minimal";
export type JobDescriptionRequestJsonView<
  V extends JobDescriptionRequestJsonViewName
> = never;
