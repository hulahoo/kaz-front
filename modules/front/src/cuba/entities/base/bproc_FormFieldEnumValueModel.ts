import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class FormFieldEnumValueModel extends BaseUuidEntity {
  static NAME = "bproc_FormFieldEnumValueModel";
  value?: string | null;
  caption?: string | null;
}
export type FormFieldEnumValueModelViewName = "_base" | "_local" | "_minimal";
export type FormFieldEnumValueModelView<
  V extends FormFieldEnumValueModelViewName
> = never;
