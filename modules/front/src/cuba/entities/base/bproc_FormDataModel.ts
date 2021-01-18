import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { FormFieldModel } from "./bproc_FormFieldModel";
import { FormOutcomeModel } from "./bproc_FormOutcomeModel";
import { FormOutputVariableModel } from "./bproc_FormOutputVariableModel";
import { FormParamModel } from "./bproc_FormParamModel";
export class FormDataModel extends BaseUuidEntity {
  static NAME = "bproc_FormDataModel";
  type?: any | null;
  screenId?: string | null;
  openMode?: any | null;
  businessKey?: string | null;
  fields?: FormFieldModel | null;
  outcomes?: FormOutcomeModel | null;
  outputVariables?: FormOutputVariableModel | null;
  formParams?: FormParamModel | null;
}
export type FormDataModelViewName = "_base" | "_local" | "_minimal";
export type FormDataModelView<V extends FormDataModelViewName> = never;
