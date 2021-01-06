import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class OutcomeParamModel extends BaseUuidEntity {
  static NAME = "bproc_OutcomeParamModel";
  name?: string | null;
  value?: string | null;
}
export type OutcomeParamModelViewName = "_base" | "_local" | "_minimal";
export type OutcomeParamModelView<V extends OutcomeParamModelViewName> = never;
