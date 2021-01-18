import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { FormFieldPropertyModel } from "./bproc_FormFieldPropertyModel";
import { FormFieldEnumValueModel } from "./bproc_FormFieldEnumValueModel";
export class FormFieldModel extends BaseUuidEntity {
  static NAME = "bproc_FormFieldModel";
  businessId?: string | null;
  type?: string | null;
  caption?: string | null;
  editable?: boolean | null;
  required?: boolean | null;
  properties?: FormFieldPropertyModel | null;
  enumValues?: FormFieldEnumValueModel | null;
}
export type FormFieldModelViewName = "_base" | "_local" | "_minimal";
export type FormFieldModelView<V extends FormFieldModelViewName> = never;
