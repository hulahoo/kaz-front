import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class InOutBindingModel extends BaseUuidEntity {
  static NAME = "bproc_InOutBindingModel";
  source?: string | null;
  sourceExpression?: string | null;
  target?: string | null;
  sourceValue?: string | null;
}
export type InOutBindingModelViewName = "_base" | "_local" | "_minimal";
export type InOutBindingModelView<V extends InOutBindingModelViewName> = never;
