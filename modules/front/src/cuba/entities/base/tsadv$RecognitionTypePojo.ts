import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class RecognitionTypePojo extends BaseUuidEntity {
  static NAME = "tsadv$RecognitionTypePojo";
  name?: string | null;
  showEmpty?: boolean | null;
  code?: string | null;
  image?: string | null;
  count?: any | null;
  coins?: any | null;
}
export type RecognitionTypePojoViewName = "_minimal" | "_local" | "_base";
export type RecognitionTypePojoView<
  V extends RecognitionTypePojoViewName
> = never;
