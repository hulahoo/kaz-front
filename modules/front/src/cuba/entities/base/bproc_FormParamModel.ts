import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class FormParamModel extends BaseUuidEntity {
  static NAME = "bproc_FormParamModel";
  name?: string | null;
  valueSource?: any | null;
  value?: string | null;
}
export type FormParamModelViewName = "_base" | "_local" | "_minimal";
export type FormParamModelView<V extends FormParamModelViewName> = never;
