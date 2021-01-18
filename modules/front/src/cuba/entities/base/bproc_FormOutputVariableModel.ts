import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class FormOutputVariableModel extends BaseUuidEntity {
  static NAME = "bproc_FormOutputVariableModel";
  name?: string | null;
  type?: string | null;
  outcome?: string | null;
}
export type FormOutputVariableModelViewName = "_base" | "_local" | "_minimal";
export type FormOutputVariableModelView<
  V extends FormOutputVariableModelViewName
> = never;
