import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class ConcourseRequestJson extends BaseUuidEntity {
  static NAME = "tsadv_ConcourseRequestJson";
  requestNumber?: string | null;
  requestDate?: string | null;
  initiator?: string | null;
  requestStatus?: string | null;
  statusCode?: string | null;
}
export type ConcourseRequestJsonViewName = "_base" | "_local" | "_minimal";
export type ConcourseRequestJsonView<
  V extends ConcourseRequestJsonViewName
> = never;
