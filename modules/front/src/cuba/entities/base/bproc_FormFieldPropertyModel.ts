import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class FormFieldPropertyModel extends BaseUuidEntity {
  static NAME = "bproc_FormFieldPropertyModel";
  name?: string | null;
  value?: string | null;
  system?: boolean | null;
}
export type FormFieldPropertyModelViewName = "_base" | "_local" | "_minimal";
export type FormFieldPropertyModelView<
  V extends FormFieldPropertyModelViewName
> = never;
