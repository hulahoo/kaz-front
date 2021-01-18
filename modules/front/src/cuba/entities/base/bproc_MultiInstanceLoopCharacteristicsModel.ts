import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class MultiInstanceLoopCharacteristicsModel extends BaseUuidEntity {
  static NAME = "bproc_MultiInstanceLoopCharacteristicsModel";
  multiInstanceType?: any | null;
  collectionSource?: any | null;
  collection?: string | null;
  collectionValue?: string | null;
  elementVariable?: string | null;
  loopCardinality?: string | null;
  completionCondition?: string | null;
}
export type MultiInstanceLoopCharacteristicsModelViewName =
  | "_base"
  | "_local"
  | "_minimal";
export type MultiInstanceLoopCharacteristicsModelView<
  V extends MultiInstanceLoopCharacteristicsModelViewName
> = never;
