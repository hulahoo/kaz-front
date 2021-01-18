import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { OutcomeParamModel } from "./bproc_OutcomeParamModel";
export class FormOutcomeModel extends BaseUuidEntity {
  static NAME = "bproc_FormOutcomeModel";
  businessId?: string | null;
  caption?: string | null;
  icon?: string | null;
  outcomeParams?: OutcomeParamModel | null;
}
export type FormOutcomeModelViewName = "_base" | "_local" | "_minimal";
export type FormOutcomeModelView<V extends FormOutcomeModelViewName> = never;
