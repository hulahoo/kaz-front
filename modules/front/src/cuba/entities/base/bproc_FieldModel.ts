import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class FieldModel extends BaseUuidEntity {
  static NAME = "bproc_FieldModel";
  name?: string | null;
  string?: string | null;
  stringValue?: string | null;
  expression?: string | null;
  implementation?: string | null;
}
export type FieldModelViewName = "_base" | "_local" | "_minimal";
export type FieldModelView<V extends FieldModelViewName> = never;
