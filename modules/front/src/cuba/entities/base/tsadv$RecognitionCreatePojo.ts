import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { QualityPojo } from "./tsadv$QualityPojo";
export class RecognitionCreatePojo extends BaseUuidEntity {
  static NAME = "tsadv$RecognitionCreatePojo";
  authorEmployeeNumber?: string | null;
  qualities?: QualityPojo | null;
  receiverEmployeeNumber?: string | null;
  recognitionTypeId?: any | null;
  notifyManager?: boolean | null;
  comment?: string | null;
}
export type RecognitionCreatePojoViewName = "_base" | "_local" | "_minimal";
export type RecognitionCreatePojoView<
  V extends RecognitionCreatePojoViewName
> = never;
